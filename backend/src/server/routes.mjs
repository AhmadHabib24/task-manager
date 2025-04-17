import TaskRoutes from "../routes/taskRoutes.mjs";
import UserRoutes from "../routes/userRoutes.mjs";
import { app } from "./serverApp.mjs";

app.use("/api", UserRoutes);
app.use("/api", TaskRoutes);

export { app };
