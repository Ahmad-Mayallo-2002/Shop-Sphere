import { toaster } from "@/components/ui/toaster";

const successToaster = (msg: string) =>
  toaster.success({
    title: "Success",
    description: msg,
    duration: 1500,
    action: {
      label: "Close",
      onClick() {},
    },
  });

const errorToaster = (msg: string) =>
  toaster.error({
    title: "Error",
    description: msg,
    duration: 1500,
    action: {
      label: "Close",
      onClick() {},
    },
  });

export { successToaster, errorToaster };
