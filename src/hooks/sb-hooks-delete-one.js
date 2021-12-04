import { ref } from 'vue';
import useClient from '@/hooks/sb-hooks';

export default function() {
  const error = ref(null);
  const data = ref([]);
  const loading = ref(true);

  const client = useClient();

  console.log('in delete');

  /**
   *
   * @param {*} table
   * @param {*} id
   * @param {*} options
   * @returns
   */
  const doDelete = async(table, id = '', options = {}) => {
    loading.value = true;
    const { data: qData, error: qError } = await client
      .from(table)
      .delete({ returning: true, ...options })
      .match({ id });

    loading.value = false;
    data.value = qData;
    error.value = qError;

    return qData;
  };

  return {
    error,
    data,
    loading,
    doDelete
  };
}
