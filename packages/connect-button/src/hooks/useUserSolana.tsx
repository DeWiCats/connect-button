import useSolana from "./useSolana";

const useUserSolana = () => {
  const { publicAddress, connecting, connected, magicAuthenticationStatus } =
    useSolana();
  return { publicAddress, connecting, connected, magicAuthenticationStatus };
};

export default useUserSolana;
