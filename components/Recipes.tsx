import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './Loading';
import CachedImage from '@/utilities/CachedImage';
import FastImage from 'react-native-fast-image';


interface Props {
    categories: Array<object>,
    mealData: { idMeal: string, strMealThumb: string, strMeal: string; }[];
}


const Recipes = ({ categories, mealData }: Props) => {
    return (
        <View className='mx-4 space-y-3'>
            <Text style={{ fontSize: hp(3) }}
                className=' font-semibold text-neutral-600'
            >Recipes</Text>

            <View>

                {
                    categories.length == 0 || mealData.length == 0 ?
                        (
                            <Loading
                                size='large'
                                color={'black'}
                                className='mt-20'
                            />
                        ) :
                        (<MasonryList
                            data={mealData}
                            keyExtractor={(item): string => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }: any) => <RecipeCard index={i} item={item} />}
                            // refreshing={isLoadingNext}
                            // onRefresh={() => refetch({ first: ITEM_CNT })}
                            onEndReachedThreshold={0.1}
                        // onEndReached={() => loadNext(ITEM_CNT)}
                        />)

                }


            </View>


        </View>
    );
};


const RecipeCard = ({ item, index }: any) => {

    const isEvent = index % 2 == 0;

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}
        >
            <Pressable
                style={{
                    width: '100%',
                    paddingLeft: isEvent ? 0 : 8,
                    paddingRight: isEvent ? 8 : 0,
                }}
                className='flex justify-center mb-4 space-y-1'
            >

                {/* <Animated.View>
                    <FastImage
                        source={{ uri: item.strMealThumb }}
                        style={{
                            width: '100%',
                            height: isEvent ? hp(25) : hp(35),
                            borderRadius: 35
                        }}
                        className=' bg-black/5'
                    />
                </Animated.View> */}


                {/* <Image
                    source={{ uri: item.strMealThumb }}
                    style={{
                        width: '100%',
                        height: isEvent ? hp(25) : hp(35),
                        borderRadius: 35
                    }}
                    className=' bg-black/5'
                /> */}

                <CachedImage
                    uri={item.strMealThumb}
                    style={{
                        width: '100%',
                        height: isEvent ? hp(25) : hp(35),
                        borderRadius: 35
                    }}
                    className=' bg-black/5'
                />

                <Text className=' font-semibold ml-2 text-neutral-600'>
                    {
                        item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + "..." : item.strMeal

                    }
                </Text>
            </Pressable>
        </Animated.View>
    );
};

export default Recipes;