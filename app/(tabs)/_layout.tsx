import React from 'react'
import { Tabs } from 'expo-router'
import TabIcon from '@/components/TabIcon'
import icons from '@/constants/icons'

const TabsLayout = () => {
  return (
   <Tabs
   screenOptions={{
     headerShown: false,
    tabBarShowLabel: false,
    tabBarActiveTintColor: '#FFA001',
    tabBarInactiveTintColor: '#CDCDE0',
    tabBarStyle: {  
      height: 64,
      backgroundColor: '#161622',
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: '#232533'
    },
    tabBarIconStyle: {
      width: 70
    }
   }}
   >
      <Tabs.Screen
         name="home"
        options={{
          title:"Home",
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
             color={color}
             focused={focused}
             label="Home"
             icon={icons.home}
            />
          )
         }} 
        />

        <Tabs.Screen
          name="bookmark"
          options={{
            title:"Bookmark",
            tabBarIcon: ({color, focused}) => (
              <TabIcon 
              color={color}
              focused={focused}
              label="Bookmark"
              icon={icons.bookmark}
              />
            )
          }} 
        />

        <Tabs.Screen
         name="create"
        options={{
          title:"Create",
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
             color={color}
             focused={focused}
             label="Create"
             icon={icons.plus}
            />
          )
         }} 
        />

        <Tabs.Screen
          name="profile"
          options={{
            title:"Profile",
            tabBarIcon: ({color, focused}) => (
              <TabIcon 
              color={color}
              focused={focused}
              label="Profile"
              icon={icons.profile}
              />
            )
          }} 
        />
   </Tabs>
  )
}

export default TabsLayout
