import React, {useMemo} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  ModalProps,
} from 'react-native';
import {WeatherDetails} from '../../../components/WeatherDetails';
import {ICoord} from '../../../shared';
import {savedWeather} from '../../../store/slice/storeWeatherSlice';
import {useAppDispatch} from '../../../utils/hooks/useAppDispatch';
import {useAppSelector} from '../../../utils/hooks/useAppSelector';
import {useWeatherDetails} from '../../../utils/hooks/useWeatherDetails';

interface IModalWeatherProps extends ModalProps {
  coord?: ICoord;
  onClose: () => void;
}

export default function ModalWeather({
  coord,
  onClose,
  ...rest
}: IModalWeatherProps) {
  const {weatherDetails} = useWeatherDetails(coord);
  const weathers = useAppSelector(state => state.storeWeather.weathers);
  const dispatch = useAppDispatch();

  const canSaveThisWeather = useMemo(() => {
    if (!weatherDetails) {
      return false;
    }
    const weatherAlreadyExists = weathers.find(
      weather => weather.id === weatherDetails.id,
    );
    if (weatherAlreadyExists) {
      return false;
    }
    return true;
  }, [weatherDetails, weathers]);

  return (
    <Modal {...rest} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.boxActions}>
            <TouchableOpacity onPress={onClose}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            {canSaveThisWeather && (
              <TouchableOpacity
                onPress={() => dispatch(savedWeather(weatherDetails))}>
                <Text>Favoritar</Text>
              </TouchableOpacity>
            )}
          </View>

          <WeatherDetails weather={weatherDetails} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 32,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  boxActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
});
