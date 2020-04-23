import React from "react";
import { useRouter } from "next/router";
import { axios } from "~/core";

import { Success, Error, Activate } from "../components";

const ActivationPage = () => {
  const { query } = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<string[]>([]);
  const [success, setSuccess] = React.useState<boolean>(false);
  const handleActivationSubmit = React.useCallback(async () => {
    setIsLoading(true);
    setErrors([]);
    await axios
      .post(`/auth/users/activation/`, query)
      .then(
        () => setSuccess(true),
        (error) => setErrors(Object.values(error.response.data))
      )
      .finally(() => setIsLoading(false));
  }, [query]);

  if (errors.length) {
    return (
      <Error
        errors={Object.values(errors)}
        handleSubmit={handleActivationSubmit}
        isLoading={isLoading}
      />
    );
  }

  return success ? (
    <Success />
  ) : (
    <Activate handleSubmit={handleActivationSubmit} isLoading={isLoading} />
  );
};

export default ActivationPage;
