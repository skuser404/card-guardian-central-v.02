
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Define CardStatus type to match the SQL check constraint
type CardStatus = 'active' | 'locked' | 'expired';

// Define the shape of transaction data
interface TransactionData {
  id: string;
  card_id: string;
  type: string;
  amount: number;
  service: string;
  route?: string;
  transaction_date: string;
  created_at: string;
}

// Define the shape of transport card data
interface TransportCardData {
  id: string;
  user_id: string;
  card_number: string;
  balance: number;
  status: CardStatus;
  issue_date: string;
  expiry_date: string;
  created_at: string;
  updated_at: string;
}

const useTransportCard = () => {
  const [card, setCard] = useState<TransportCardData | null>(null);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCardData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setError('No authenticated user found');
          setIsLoading(false);
          return;
        }

        // Fetch user's transport card
        const { data: cardData, error: cardError } = await supabase
          .from('transport_cards')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (cardError) {
          console.error('Error fetching card data:', cardError);
          setError('Failed to fetch your transport card data');
          setIsLoading(false);
          return;
        }

        if (cardData) {
          // Ensure status is one of the allowed CardStatus values
          const typedCardData: TransportCardData = {
            ...cardData,
            status: cardData.status as CardStatus
          };
          
          setCard(typedCardData);

          // Fetch transaction history for this card
          const { data: transactionData, error: transactionError } = await supabase
            .from('transactions')
            .select('*')
            .eq('card_id', cardData.id)
            .order('transaction_date', { ascending: false });

          if (transactionError) {
            console.error('Error fetching transaction data:', transactionError);
            setError('Failed to fetch your transaction history');
          } else {
            setTransactions(transactionData || []);
          }
        }

      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCardData();
  }, []);

  const updateCardBalance = async (amount: number): Promise<boolean> => {
    if (!card) return false;
    
    try {
      const newBalance = card.balance + amount;
      
      if (newBalance < 0) {
        toast({
          title: "Insufficient balance",
          description: "You don't have enough balance for this transaction.",
          variant: "destructive"
        });
        return false;
      }
      
      const { data, error } = await supabase
        .from('transport_cards')
        .update({ balance: newBalance })
        .eq('id', card.id)
        .select('*')
        .single();
        
      if (error) {
        console.error('Error updating balance:', error);
        toast({
          title: "Update failed",
          description: "Failed to update card balance. Please try again.",
          variant: "destructive"
        });
        return false;
      }
      
      // Update local state with the updated card
      if (data) {
        // Ensure status is one of the allowed CardStatus values
        const typedCardData: TransportCardData = {
          ...data,
          status: data.status as CardStatus
        };
        
        setCard(typedCardData);
        
        toast({
          title: "Balance updated",
          description: `Your new balance is ₹${newBalance.toFixed(2)}`,
        });
      }
      
      return true;
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Update failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const recordTransaction = async (type: string, amount: number, service: string, route?: string): Promise<boolean> => {
    if (!card) return false;
    
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([
          {
            card_id: card.id,
            type,
            amount,
            service,
            route,
            transaction_date: new Date().toISOString()
          }
        ])
        .select()
        .single();
        
      if (error) {
        console.error('Error recording transaction:', error);
        toast({
          title: "Transaction failed",
          description: "Failed to record transaction. Please try again.",
          variant: "destructive"
        });
        return false;
      }
      
      // Update transactions list
      if (data) {
        setTransactions(prev => [data, ...prev]);
      }
      
      return true;
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Transaction failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    card,
    transactions,
    isLoading,
    error,
    updateCardBalance,
    recordTransaction
  };
};

export default useTransportCard;
