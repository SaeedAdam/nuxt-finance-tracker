export const useFetchTransactions = (period: any) => {
  const supabase = useSupabaseClient();
  const transactions = ref<any[]>([]);
  const pending = ref(false);

  const income = computed(() => transactions.value.filter((t: any) => t.type === 'Income'));
  const expense = computed(() => transactions.value.filter((t: any) => t.type === 'Expense'));

  const incomeCount = computed(() => income.value.length);
  const expenseCount = computed(() => expense.value.length);

  const incomeTotal = computed(() =>
    income.value.reduce((sum: number, transaction: any) => sum + transaction.amount, 0)
  );

  const expenseTotal = computed(() =>
    expense.value.reduce((sum: number, transaction: any) => sum + transaction.amount, 0)
  );

  const fetchTransactions = async () => {
    pending.value = true;
    try {
      const { data } = await useAsyncData(
        `transactions-${period.value.start?.toDateString()}-${period.value.end?.toDateString()}`,
        async () => {
          console.log('fetching transactions');

          const { data, error } = await supabase
            .from('transactions')
            .select()
            .gte('created_at', period.value.start.toISOString())
            .lte('created_at', period.value.end.toISOString())
            .order('created_at', { ascending: false });

          if (error) return [];

          return data;
        });

      return data.value;
    } catch (error) {
      console.log(error);
    }
    finally {
      pending.value = false;
    }
  };

  const refresh = async () => transactions.value = (await fetchTransactions()) || [];

  watch(period, async () => await refresh());

  const transactionsGroupedByDate = computed(() => {
    let grouped: Record<string, any[]> = {};

    for (const transaction of transactions.value) {
      const date = transaction.created_at.split('T')[0];

      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push(transaction);
    }

    return grouped;
  });

  return {
    transactions: {
      all: transactions,
      grouped: {
        byDate: transactionsGroupedByDate,
      },
      income,
      expense,
      incomeTotal,
      expenseTotal,
      incomeCount,
      expenseCount,
    },
    refresh,
    pending,
  };
};
