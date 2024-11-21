import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTickets, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function Tickets() {
   const { Tickets, isLoading, isSuccess } = useSelector(
      (state) => state.tickets
   );

   // initializing dispatch
   const dispatch = useDispatch();

   useEffect(
      () => {
         if (isSuccess) {
            //for unloading
            dispatch(reset());
         }

         dispatch(getTickets());
      },
      [dispatch],
      isSuccess
   );

   if (isLoading) {
      return <Spinner />;
   }

   return <div>Tickets</div>;
}
export default Tickets;
