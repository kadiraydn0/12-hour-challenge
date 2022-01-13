import { get } from "lodash";
import permissionsTypes from "../permissions.js";
import { checkPermission } from "../service/permissions.service";

// Erişim izinlerini kontrol eder.
const accessPermissions = async (req, res, next) => {
  const permissionId = req.method + "|" + req.baseUrl + req.route.path;
  const permissionCode = get(permissionsTypes, permissionId);
  const user = get(req, "user");
  const permission = await checkPermission(user.permissions, permissionCode);

  if (!permission) {
    return res.sendStatus(401);
  }

  return next();
};

export default accessPermissions;
