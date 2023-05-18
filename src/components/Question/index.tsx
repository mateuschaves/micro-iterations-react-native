import { Dimensions, Text } from "react-native";

import { Option } from "../Option";
import { styles } from "./styles";
import Animated, { Keyframe, RotateInUpLeft } from "react-native-reanimated";

type QuestionProps = {
  title: string;
  alternatives: string[];
};

type Props = {
  question: QuestionProps;
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
};

const { width } = Dimensions.get("window");

export function Question({
  question,
  alternativeSelected,
  setAlternativeSelected,
}: Props) {
  const enteringAnimation = new Keyframe({
    from: {
      opacity: 0,
      transform: [
        {
          translateX: width,
        },
        {
          rotate: "90deg",
        },
      ],
    },
    to: {
      opacity: 1,
      transform: [
        {
          translateX: 0,
        },
        {
          rotate: "0deg",
        },
      ],
    },
  });

  const exitingAnimation = new Keyframe({
    from: {
      opacity: 1,
      transform: [
        {
          translateX: 0,
        },
        {
          rotate: "90deg",
        },
      ],
    },
    to: {
      opacity: 0,
      transform: [
        {
          translateX: -width,
        },
        {
          rotate: "0deg",
        },
      ],
    },
  });

  return (
    <Animated.View entering={enteringAnimation} exiting={exitingAnimation} style={styles.container}>
      <Text style={styles.title}>{question.title}</Text>

      {question.alternatives.map((alternative, index) => (
        <Option
          key={index}
          title={alternative}
          checked={alternativeSelected === index}
          onPress={() =>
            setAlternativeSelected && setAlternativeSelected(index)
          }
        />
      ))}
    </Animated.View>
  );
}
