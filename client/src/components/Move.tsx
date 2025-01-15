type Props = {
  player: string;
};

const Moves = ({ player }: Props) => {
  return (
    <div className="absolute left-10 bottom-40">
      <h1 className="text-white mb-2">Move : </h1>
      <p className="text-white">{player} to move</p>
    </div>
  );
};

export default Moves;
