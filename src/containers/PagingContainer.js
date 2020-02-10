import usePaging from "../hooks/usePaging";
import { createContainer } from "unstated-next";

/**
 * Creates a context providing container with the application's paging state.
 */
export default createContainer(usePaging);
