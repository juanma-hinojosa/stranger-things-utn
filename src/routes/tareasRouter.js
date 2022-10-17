import { Router } from "express";
import {
    home,
    creadores,
    datoGuardado,
    eliminarUser,
    editar,
    editPost,
    eliminado
    // tareasId,
    // agregarTareas,
    // editarTarea,
    // editar,
    // eliminarTarea
}  from "../controllers/tareasControler.js"

export const router = Router();

router.get("/", home);
router.get("/creadores", creadores);
router.get("/editar/:id", editar)
router.get("/eliminar/:id", eliminarUser)
router.post("/postSucces", datoGuardado);
router.put("/actualizar/:id", editPost)
router.delete("/eliminado/:id", eliminado)

// router.post("/postSucces", datoGuardado);
// router.get("/tareas", dameTareas);
// router.get("/tareas/:id", tareasId);
// router.post("/addTareas", agregarTareas);
// router.get("/editar", editar);
// router.put("/editar/:id", editarTarea);
// router.delete("/eliminar/:id", eliminarTarea);