import React from "react"
import { View } from "react-native"
import SearchBar from "react-native-dynamic-search-bar"
import { 
    StyleSheet,
} from 'react-native';

const Search = () => {
    const [searchText, setSearchText] = React.useState("")
    const [spinnerVisibility, setSpinnerVisibility] = React.useState(false)

    const handleOnChangeText = (text) => {
        // ? Visible the spinner
        setSearchText(text)
        setSpinnerVisibility(true)

        // ? After you've done to implement your use-case
        // ? Do not forget to set false to spinner's visibility
        setSpinnerVisibility(false)
    };

    return (
        <View>
            <SearchBar
                height={50}
                fontSize={18}
                fontColor="#000"
                iconColor="#000"
                shadowColor="#2D52B0"
                cancelIconColor="#000"
                backgroundColor="#fff"
                spinnerVisibility={spinnerVisibility}
                placeholder="Search ..."
                style={styles.searchBar}
                onChangeText={handleOnChangeText}
            />
        </View>
    );
}

export default Search

const styles = StyleSheet.create({
    searchBar: {
        marginTop: 10,
        height: 50,
        borderRadius: 15,
    }
})