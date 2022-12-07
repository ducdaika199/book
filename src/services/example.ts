import { dehydrate, QueryClient } from '@tanstack/react-query';
import { instance } from './axios';

const fetchTodoList = async () => {
  const res = await instance.get('https://jsonplaceholder.typicode.com/todos');
  return res.data;
};

// export default function ServerPage() {
//   /**
//    * MARK: -TanstackQuery
//    * Case 1 if you don't need prefetching data on the server you just need this code below
//    *
//    */

//   const { data } = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
//   console.log(data)

//     return <>Hello server data</>
// }

/**
 * MARK: -TanstackQuery
 * Case 2: Demo hydrate data server side (Using Hydration), prefetching data on the server and passing that to the queryClient.
 *
 */

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['todos'], fetchTodoList);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

/**
 * MARK: -TanstackQuery
 * Case 3: initialData data server side (Using initialData), prefetching data on the server and passing that to the queryClient.
 * Example below
 */

/*
   export default function ServerPage(props) {
    const { data } = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList, initialData: props.todos, })
    console.log(data)

      return <>Hello server data</>
  }

  export async function getStaticProps() {
    const todos = await fetchTodoList()
    return { props: { todos } }
  }
  */
