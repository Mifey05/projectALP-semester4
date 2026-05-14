import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Text,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import styles from './styles';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 4;

type IconName = React.ComponentProps<typeof Feather>['name'];

const tabs: {
  key: string;
  label: string;
  icon: IconName;
  route: string;
}[] = [
  { key: 'beranda', label: 'Beranda', icon: 'home', route: '/beranda' },
  { key: 'history', label: 'History', icon: 'file-text', route: '/history' },
  { key: 'subscription', label: 'Subscription', icon: 'heart', route: '/subscription' },
  { key: 'kelas', label: 'Kelas', icon: 'book', route: '/kelas' },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const anim = useRef(new Animated.Value(0)).current;

  const activeIndex = tabs.findIndex(tab =>
    pathname.startsWith(tab.route)
  );

  useEffect(() => {
  anim.setValue(
    activeIndex === -1
      ? 0
      : activeIndex
  );
}, [activeIndex]);

  const handlePress = (index: number) => {
    router.replace(tabs[index].route);
  };

  const translateX = anim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [
      TAB_WIDTH * 0.5,
      TAB_WIDTH * 1.5,
      TAB_WIDTH * 2.5,
      TAB_WIDTH * 3.5,
    ],
  });

  return (
    <View style={styles.wrapper}>

      <View style={styles.container}>
        {tabs.map((tab, i) => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => handlePress(i)}
          >
            {activeIndex !== i && (
              <Feather name={tab.icon} size={22} color="#fff" />
            )}

            {/* label tampil kalau aktif */}
            {activeIndex === i && (
              <Text style={styles.label}>{tab.label}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Animated.View
        style={[
          styles.circleWrapper,
          {
            transform: [
              { translateX },
              { translateX: -32 },
            ],
          },
        ]}
      >
        <View style={styles.circle}>
          <Feather
            name={tabs[activeIndex === -1 ? 0 : activeIndex].icon}
            size={24}
            color="#8CC8C0"
          />
        </View>
      </Animated.View>

    </View>
  );
}