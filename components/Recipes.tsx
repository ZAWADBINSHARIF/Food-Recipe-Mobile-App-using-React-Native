import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './Loading';
import { Link } from 'expo-router';
import { MasonryFlashList } from "@shopify/flash-list";

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


                        (
                            <MasonryFlashList
                                data={mealData}
                                numColumns={2}
                                renderItem={({ item, index }) => <RecipeCard item={item} index={index} />}
                                estimatedItemSize={hp(35)}
                            />
                        )

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
            <Link href={{
                pathname: '/recipeDetails',
                params: { ...item }
            }} asChild>
                <Pressable
                    style={{
                        width: '100%',
                        paddingLeft: isEvent ? 0 : 8,
                        paddingRight: isEvent ? 8 : 0,
                    }}
                    className='flex justify-center mb-4 space-y-1'
                >

                    <Animated.Image
                        source={{ uri: item.strMealThumb }}
                        style={{
                            width: '100%',
                            height: isEvent ? hp(25) : hp(35),
                            borderRadius: 35
                        }}
                        className=' bg-black/5'
                        sharedTransitionTag={item?.idMeal as string}
                    />

                    <Text className=' font-semibold ml-2 text-neutral-600'>
                        {
                            item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + "..." : item.strMeal

                        }
                    </Text>
                </Pressable>
            </Link>
        </Animated.View>
    );
};

export default Recipes;