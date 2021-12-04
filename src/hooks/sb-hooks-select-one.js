import { ref } from 'vue';
import useClient from '@/hooks/sb-hooks';

export default function(table, columns = '*', id = '') {
  const error = ref(null);
  const data = ref([]);
  const loading = ref(true);

  const client = useClient();

  console.log('in query');

  (async() => {
    const { data: qData, error: qError } = await client
      .from(table)
      .select(columns)
      .eq('id', id);
    loading.value = false;
    data.value = qData;
    error.value = qError;

    console.log(qData);
  })();

  return {
    error,
    data,
    loading
  };
}
