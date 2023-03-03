export const GoBack = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={goBack}
      className="bg-black text-white font-bold px-5 py-2"
    >
      Retour
    </button>
  );
};
