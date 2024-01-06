export const TableHead = () => {
  return (
    <thead>
      <tr>
        <th rowSpan={2} className="border border-slate-700" />
        <th
          className="pl-[35px] align-bottom border border-slate-700"
          rowSpan={2}
        >
          Team
        </th>
        <th
          className="points font-bold text-center w-4 align-bottom border border-slate-700"
          rowSpan={2}
        >
          Points
        </th>
        <th className="text-center border border-slate-700" colSpan={3}>
          Games
        </th>
        <th className="text-center border border-slate-700" colSpan={3}>
          Sets
        </th>
        <th className="text-center border border-slate-700" colSpan={3}>
          Points
        </th>
      </tr>
      <tr>
        <th className="text-center border border-slate-700">Played</th>
        <th className="text-center border border-slate-700">Won</th>
        <th className="text-center border border-slate-700">Lost</th>
        <th className="text-center border border-slate-700">SF</th>
        <th className="text-center border border-slate-700">SA</th>
        <th className="text-center border border-slate-700">DIFF</th>
        <th className="text-center border border-slate-700">PF</th>
        <th className="text-center border border-slate-700">PA</th>
        <th className="text-center border border-slate-700">DIFF</th>
      </tr>
    </thead>
  );
};
