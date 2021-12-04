import { ref } from 'vue';
import useClient from '@/hooks/sb-hooks';

export default function() {
  const error = ref(null);
  const data = ref([]);
  const loading = ref(false);

  const client = useClient();

  console.log('in upsert');

  const doUpsert = async(table = '', rows = [{}], options = {}) => {
    loading.value = true;
    const { data: qData, error: qError } = await client
      .from(table)
      .upsert(rows, { ...options });
    loading.value = false;
    data.value = qData;
    error.value = qError;

    return qData;
  };

  return {
    error,
    data,
    loading,
    doUpsert
  };
}
