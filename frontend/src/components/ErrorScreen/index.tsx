import HomeButton from "../HomeButton";
import Screen from "../Screen";

type Props = {
  message: string;
};

export default function ErrorScreen({ message }: Props) {
  return (
    <Screen>
      <p className="text-lg">{message}</p>
      <HomeButton />
    </Screen>
  );
}
