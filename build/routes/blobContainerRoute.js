"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const containerController_1 = require("../controllers/azure/containerController");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/create", containerController_1.createContainer);
router.get("/containers", containerController_1.listContainer);
router.delete("/delete", containerController_1.deleteContainer);
//# sourceMappingURL=blobContainerRoute.js.map