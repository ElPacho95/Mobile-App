import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './Screens/HomeScreen'
import LogInScreen from './Screens/LogInScreen'

import { Provider } from 'react-redux'
import { store } from './store/store'

const Stack = createStackNavigator()

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name='Home' component={LogInScreen} />
					<Stack.Screen name='Main' component={HomeScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	)
}
