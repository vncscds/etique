import { Colors } from '@/shared/constants';
import { useRouter } from 'expo-router';
import { ArrowLeftIcon } from 'lucide-react-native';
import React from 'react';
import * as RN from 'react-native';
import { match, P } from 'ts-pattern';
import Icon from './Icon';
import Typography from './Typography';

type HeaderBackButtonProps = {}

function HeaderBackButton() {
  const router = useRouter();

  const handleOnBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  }

  return (
    <RN.Pressable onPress={handleOnBack}>
      <Icon icon={ArrowLeftIcon} iconSize='2xl' iconColor={Colors.MAIN_COLORS.ETIQUE.C2} />
    </RN.Pressable>
  )
}

type HeaderProps = {
  title: string;
  description?: string;
  renderLeft?: () => React.ReactNode;
  hideLogo?: boolean;
}

export default function Header({
  title,
  description,
  renderLeft,
}: HeaderProps) {
  const Description = () => {
    return match(description)
      .with(P.nonNullable, () => {
        return (
          <Typography
            fontSize='2xs'
            customStyle={{
              lineHeight: 9,
              color: Colors.NEUTRAL_COLORS.C6,
            }}
          >
            {description}
          </Typography>
        )
      })
      .otherwise(() => null);
  }

  return (
    <RN.View style={[styles.container]}>
      <RN.View style={{ position: 'absolute', left: 16 }}>
        {renderLeft?.()}
      </RN.View>
      <RN.View style={styles.textContainer}>
        <Typography
          fontSize='lg'
          fontFamily='Inter_700Bold'
          customStyle={styles.text}
        >
          {title}
        </Typography>
        <Description />
      </RN.View>
    </RN.View>
  )
}

Header.BackButton = HeaderBackButton

const styles = RN.StyleSheet.create({
  container: {
    boxShadow: '1px 1px 10px rgba(0,0,0,.09)',
    backgroundColor: '#FFFFFF',
    borderBottomColor: 'pink',
    borderBottomWidth: .9,
    flexDirection: 'row',
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center'

  },
  image: {
    width: 42,
    height: 42,
  },
  textContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center'
  },
})