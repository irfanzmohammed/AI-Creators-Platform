// import { useMutation, useQuery } from "convex/react"
// import { useEffect, useState } from "react"
// import { toast } from "sonner"

// export const useConvexQuery=(query, ...args)=>{
//     const result=useQuery(query,...args)
//     const [data,setData]=useState(undefined)
//     const[isLoading,setIsLoading]=useState(true)
//     const [error,setError]=useState(null);

//     useEffect(
//         ()=>{
//           if(result===undefined){
//             setIsLoading(true)
//           }
//           else{
//             try{
//                 setData(result);
//                 setError(null)
//             }
//             catch(err){
//                 setError(err)
//                 toast.error(err.message)
//             }
//             finally{
//             setIsLoading(false)
//           }
//           }
          
//         },
//     [result]);

//     return {
//         data,isLoading,error
//     }
// }

// export const useConvexMutation=(mutation)=>{
//     const mutationFn=useMutation(mutation)

//     const [data,setData]=useState(undefined)
//     const[isLoading,setIsLoading]=useState(false)
//     const [error,setError]=useState(null);

//     const mutate=async(...args)=>{
//         setIsLoading(true);
//         setError(null);
//         try{
//           const response=await mutationFn(...args)
//           setData(response);
//           return response;
//         }

//         catch(err){
//             setError(err)
//             toast.error(err.message)
//         }

//         finally{
//             setIsLoading(false);
//         }
//     }

//     return {
//         mutate,data,error,isLoading
//     }

    
// }

import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useConvexQuery = <T,>(query: any, args?: any) => {
  const result = useQuery(query, args) as T | undefined;
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (result === undefined) {
      setIsLoading(true);
    } else {
      try {
        setData(result);
        setError(null);
      } catch (err) {
        const error = err as Error;
        setError(error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [result]);

  return { data, isLoading, error };
};

export const useConvexMutation = <T,>(mutation: any) => {
  const mutationFn = useMutation(mutation);
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (...args: any[]): Promise<T | undefined> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await mutationFn(...args) as T;
      setData(response);
      return response;
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error(error.message);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, data, error, isLoading };
};