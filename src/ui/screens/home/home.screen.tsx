import React, { useCallback, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { styles } from './home.styles';
import Card from '../../atoms/cart/cart.atom';
import { useCarts } from '../hook/useCarts.facade';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';
import IconButton from '../../atoms/button/iconButton.atom';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Home>;
}

const HomeScreen = ({ navigation }: Props) => {
  const {
    carts,
    favoriteIds,
    refreshCarts,
    loadFavorites,
    addFavorite,
    FilterType,
    sorting,
    onApplyFilter,
  } = useCarts();

  // ** USE CALLBACK ** //
  const renderItem = useCallback(
    ({ item }) => (
      <Card
        cart={item}
        onAddFavorite={() => addFavorite(item)}
        selected={favoriteIds.includes(item.id)}
        onPress={() => {
          if (!item.id) {
            return;
          }
          navigation.navigate(Screen.Detail, {
            id: item.id,
            idsArray: carts.map((el) => el.id),
          });
        }}
      />
    ),
    [addFavorite, carts, favoriteIds, navigation]
  );

  const ItemSeparatorComponent = useCallback(() => <View style={styles.itemSeparator}></View>, []);

  const renderFilterButtons = useCallback(() => {
    return (
      <View style={styles.sortersContainer}>
        <IconButton icon={'arrow-up'} onPress={() => onApplyFilter(FilterType.INCREASING)} />
        <IconButton icon={'arrow-down'} onPress={() => onApplyFilter(FilterType.DECREASING)} />
        <IconButton
          icon={'refresh'}
          onPress={() => onApplyFilter(FilterType.DEFAULT)}
          color={sorting !== FilterType.DEFAULT ? 'white' : 'grey'}
          disabled={sorting === FilterType.DEFAULT}
        />
      </View>
    );
  }, [FilterType, onApplyFilter, sorting]);

  // ** USE EFFECT ** //
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Favorites screen focused');
      refreshCarts();
      loadFavorites();
    });

    return unsubscribe;
  }, [loadFavorites, navigation, refreshCarts]);

  return (
    <View style={styles.container}>
      {renderFilterButtons()}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={carts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
};

export default HomeScreen;
