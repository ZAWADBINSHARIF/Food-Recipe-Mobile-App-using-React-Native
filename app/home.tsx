// external import
import { View, Text, ScrollView, Image, TextInput, BackHandler, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router, usePathname } from 'expo-router';
import axios from 'axios';

// internal import
import Categories from '@/components/Categories';
import Recipes from '@/components/Recipes';
import { FontAwesome6 } from '@expo/vector-icons';


const home = () => {

    const pathname = usePathname();

    const [activeCategory, setActiveCategory] = useState<string>("Beef");
    const [categories, setCategories] = useState<{ idCategory: string, strCategory: string, strCategoryThumb: string, strCategoryDescription: string; }[]>([]);
    const [meals, setMeals] = useState<{ idMeal: string, strMealThumb: string, strMeal: string; }[]>([]);

    const handleChangeCategory = (categoryName: string) => {

        setMeals([]);

        setActiveCategory(categoryName);
        fetchMeals(categoryName);
    };


    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');

            if (response && response.data) {
                setCategories(response.data.categories);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const fetchMeals = async (categoryName: string = 'Beef') => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);

            if (response && response.data) {
                setMeals(response.data.meals);
            }

        } catch (error) {
            console.log(error);
        }
    };


    BackHandler.addEventListener('hardwareBackPress', function () {

        if (pathname === '/home') {

            Alert.alert('Exit', 'Are you sure to exit?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => BackHandler.exitApp() },
            ],
                { cancelable: true }
            );

        } else {
            router.back();
        }

        return true;

    });


    useEffect(() => {
        fetchCategories();
        fetchMeals();
    }, []);

    return (
        <View className='flex-1 bg-white'>


            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    'paddingBottom': 50
                }}
                className='space-y-6 pt-14'
            >

                <View className="mx-4 flex-row justify-between items-center mb-2">
                    <Image source={require('@/assets/images/avatar.png')} style={{ height: hp(5.5), width: hp(5) }} />
                    <FontAwesome6 name="bell" size={hp(3)} color="gray" />
                </View>


                <View className='mx-4 space-y-2 mb-2'>
                    <Text style={{ fontSize: hp(1.7) }} className='text-neutral-600'>Hello, ZAWAD</Text>
                    <Text style={{ fontSize: hp(3.8) }} className=' font-semibold text-neutral-600'>Make your own food,</Text>
                    <Text style={{ fontSize: hp(3.8) }} className=' font-semibold text-neutral-600'>stay at <Text className='text-amber-400'>home</Text></Text>
                </View>


                <View className='mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]'>
                    <TextInput
                        placeholder='Search any recipe'
                        placeholderTextColor={'gray'}
                        style={{ fontSize: hp(1.7) }}
                        className='flex-1 text-base mb-1 pl-3 tracking-wider'
                    />

                    <View className='bg-white rounded-full p-3'>
                        <FontAwesome6 name="magnifying-glass" size={hp(2)} color="gray" />
                    </View>
                </View>


                <View>
                    {
                        categories.length > 0 &&
                        <Categories
                            activeCategory={activeCategory}
                            handleChangeCategory={handleChangeCategory}
                            categories={categories}
                        />
                    }
                </View>



                <Recipes categories={categories} mealData={meals} />



            </ScrollView>


            <StatusBar style='dark' />

        </View>
    );
};

export default home;