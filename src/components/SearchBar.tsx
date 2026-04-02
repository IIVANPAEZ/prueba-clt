import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';

interface Props {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<Props> = ({
  onSearch,
  placeholder = 'Buscar productos...',
}) => {
  const [text, setText] = useState('');
  const isFirstRender = useRef(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      onSearch(text);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [text, onSearch]);

  return (
    <Searchbar
      placeholder={placeholder}
      value={text}
      onChangeText={setText}
      style={styles.searchbar}
      inputStyle={styles.input}
      iconColor="#1565C0"
      placeholderTextColor="#90A4AE"
    />
  );
};

const styles = StyleSheet.create({
  searchbar: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  input: {
    fontSize: 15,
    color: '#1A1A2E',
  },
});

export default React.memo(SearchBar);
