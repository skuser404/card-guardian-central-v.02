
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export type CardStatus = "active" | "locked" | "expired";

export interface TransportCardData {
  id: string;
  card_number: string;
  balance: number;
  status: CardStatus;
  issue_date: string;
  expiry_date: string;
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  service: string;
  route: string;
  transaction_date: string;
}

export const useTransportCard = () => {
  const [card, setCard] = useState<TransportCardData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is authenticated
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      setUser(data.session?.user || null);
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
        setUser(session?.user || null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Fetch card data if user is authenticated
    if (user) {
      fetchCardData();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchCardData = async () => {
    try {
      setIsLoading(true);

      // Get user's card
      const { data: cardData, error: cardError } = await supabase
        .from('transport_cards')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (cardError) throw cardError;

      setCard(cardData);

      // Get card transactions
      if (cardData) {
        const { data: transactionData, error: transactionError } = await supabase
          .from('transactions')
          .select('*')
          .eq('card_id', cardData.id)
          .order('transaction_date', { ascending: false });

        if (transactionError) throw transactionError;

        setTransactions(transactionData || []);
      }
    } catch (error: any) {
      console.error('Error fetching card data:', error);
      toast({
        title: "Failed to load card data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateCardStatus = async (status: CardStatus) => {
    try {
      if (!card) return;

      const { error } = await supabase
        .from('transport_cards')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', card.id);

      if (error) throw error;

      setCard((prev) => prev ? { ...prev, status } : null);

      toast({
        title: `Card ${status === 'active' ? 'unlocked' : 'locked'} successfully`,
      });
    } catch (error: any) {
      console.error('Error updating card status:', error);
      toast({
        title: "Failed to update card status",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const rechargeCard = async (amount: number) => {
    try {
      if (!card) return;

      // Start a transaction with Supabase
      const { data: updatedCard, error: updateError } = await supabase
        .from('transport_cards')
        .update({ 
          balance: card.balance + amount,
          updated_at: new Date().toISOString() 
        })
        .eq('id', card.id)
        .select()
        .single();

      if (updateError) throw updateError;

      // Record the transaction
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          card_id: card.id,
          type: 'Card Recharge',
          amount: amount,
          service: 'Online Payment',
          route: 'UPI Transaction',
        });

      if (transactionError) throw transactionError;

      setCard(updatedCard);
      
      // Refresh transactions list
      fetchCardData();

      toast({
        title: "Recharge successful",
        description: `₹${amount} added to your card`,
      });
    } catch (error: any) {
      console.error('Error recharging card:', error);
      toast({
        title: "Recharge failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    card,
    transactions,
    isLoading,
    isAuthenticated,
    user,
    updateCardStatus,
    rechargeCard,
    refreshData: fetchCardData,
  };
};
