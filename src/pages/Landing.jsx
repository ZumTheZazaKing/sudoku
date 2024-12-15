export const Landing = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen w-screen">
      <h1 className="text-3xl font-semibold">
        Zum
        <span className="text-blue-500">Sudoku</span>
      </h1>
      <div className="flex flex-col gap-2">
        <button className="px-4 py-2 bg-blue-400 rounded-lg text-white min-w-[100px] uppercase tracking-wider">
          Play
        </button>
      </div>
    </div>
  );
};
