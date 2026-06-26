import httpStatus from "http-status";

export function successRes2(res, status, message, data) {
  return res.status(status || 200).json({
    code: status || 200, // Keeps the existing structure
    message,
    ...data,
  });
}

export function errorRes2(res, status, message) {
  return res.status(status || 500).json({
    code: status || 500,
    message: message || httpStatus[`${status}_MESSAGE`],
  });
}

