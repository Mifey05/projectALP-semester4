import { LinearGradient } from 'expo-linear-gradient';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { router } from 'expo-router';

import Navbar from '../components/navbar/navbar';

import HistoryCard from '../components/ui/history-card';

import {
  getHistoryDesign
} from '../services/editdesain.services';

type HistoryItem = {
  design_id: number;
  title: string;
  thumbnail_url: string;
  created_at: string;
};

export default function History() {

  const [historyData, setHistoryData] =
    useState<HistoryItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const token =
          await AsyncStorage.getItem(
            'token'
          );

        if (!token) {

          setError(
            'Token tidak ditemukan'
          );

          return;
        }

        const result =
          await getHistoryDesign(
            token
          );

        console.log(
          'history fetch result:',
          result
        );

        setHistoryData(
          result.data || []
        );

      } catch (err) {

        console.log(err);

        setError(
          'Gagal mengambil history desain.'
        );

      } finally {

        setLoading(false);
      }
    };

    fetchHistory();

  }, []);

  return (

    <View style={{ flex: 1 }}>

      <LinearGradient
        colors={[
          '#8CC8C0',
          '#FFFFFF'
        ]}
        start={{
          x: 0,
          y: 0
        }}
        end={{
          x: 0,
          y: 1
        }}
        style={
          styles.headerContainer
        }
      >

        <Text style={styles.header}>
          History
        </Text>

        <View
          style={
            styles.subtitleContainer
          }
        >

          <View style={styles.line} />

          <Text style={styles.subtitle}>
            Design Yang Saya Buat
          </Text>

          <View style={styles.line} />

        </View>

      </LinearGradient>

      <View style={styles.content}>

        {loading ? (

          <ActivityIndicator
            size="large"
            color="#2f6f68"
            style={styles.loading}
          />

        ) : error ? (

          <View style={styles.emptyState}>

            <Text style={styles.emptyText}>
              {error}
            </Text>

          </View>

        ) : historyData.length === 0 ? (

          <View style={styles.emptyState}>

            <Text style={styles.emptyText}>
              Belum ada desain tersimpan.
            </Text>

          </View>

        ) : (

          <FlatList
            data={historyData}
            numColumns={2}
            keyExtractor={(item) =>
              String(item.design_id)
            }

            showsVerticalScrollIndicator={false}

            columnWrapperStyle={{
              justifyContent:
                'space-between'
            }}

            contentContainerStyle={{
              paddingBottom: 120
            }}

            renderItem={({ item }) => (

              <HistoryCard
                title={item.title}

                desc={
                  new Date(
                    item.created_at
                  ).toLocaleDateString()
                }

                image={{
                  uri:
                    item.thumbnail_url ||
                    'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop'
                }}

                onPress={() => {
                  router.push(
                    `/edit-desain?id=${item.design_id}`
                  );
                }}
              />
            )}
          />

        )}
      </View>

      <Navbar />

    </View>
  );
}

const styles = StyleSheet.create({

  headerContainer: {
    height: 95,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 18,
    paddingHorizontal: 16,
  },

  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },

  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  subtitle: {
    marginHorizontal: 10,
    fontSize: 12,
    color: '#2f6f68',
    fontWeight: '500',
  },

  line: {
    width: 70,
    height: 1,
    backgroundColor: '#7db3aa',
  },

  content: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  loading: {
    marginTop: 32,
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },

  emptyText: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
  },
});