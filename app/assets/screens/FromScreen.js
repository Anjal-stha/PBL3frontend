// FormsScreen.js
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const formData = [
  {
    id: 'FORM_A',
    question: 'What age ranges are present in your travel group?',
    type: 'multiple',
    options: [
      { key: '0', label: '0-19' },
      { key: '1', label: '20-39' },
      { key: '2', label: '40-59' },
      { key: '3', label: '60+' },
    ],
  },
  {
    id: 'FORM_B',
    question: 'What is your trip budget (per person, per night)?',
    type: 'single',
    options: [
      { key: '0', label: '$0-$49' },
      { key: '1', label: '$50-$99' },
      { key: '2', label: '$100-$249' },
      { key: '3', label: '$300+' },
    ],
  },
  {
    id: 'FORM_C',
    question: 'What season are you planning to travel?',
    type: 'multiple',
    options: [
      { key: '0', label: 'Winter' },
      { key: '1', label: 'Spring' },
      { key: '2', label: 'Summer' },
      { key: '3', label: 'Fall' },
    ],
  },
  
  {
    id: 'FORM_G',
    question: 'What scenery are you seeking? Multiple selections encouraged.',
    type: 'multiple',
    options: [
      { key: '0', label: 'Urban' },
      { key: '1', label: 'Rural' },
      { key: '2', label: 'Sea' },
      { key: '3', label: 'Mountain' },
      { key: '4', label: 'Lake' },
      { key: '5', label: 'Desert' },
      { key: '6', label: 'Plains' },
      { key: '7', label: 'Jungle' },
    ],
  },
  {
    id: 'FORM_H',
    question: 'Activity Level',
    type: 'single',
    options: [
      { key: '0', label: 'Chill & Relaxed' },
      { key: '1', label: 'Balanced' },
      { key: '2', label: 'Active' },
    ],
  },
  {
    id: 'FORM_I',
    question: 'Safety Conscious',
    type: 'single',
    options: [
      { key: '0', label: 'Very Safety Conscious' },
      { key: '1', label: 'Balanced' },
      { key: '2', label: 'Ready for Anything' },
    ],
  },
  {
    id: 'FORM_J',
    question: 'Destination Popularity',
    type: 'single',
    options: [
      { key: '0', label: 'Off the Beaten Path' },
      { key: '1', label: 'Classic Spot' },
      { key: '2', label: 'Mainstream & Trendy' },
    ],
  },
 

];

export default function FormScreen() {
    const navigation = useNavigation();

  const [answers, setAnswers] = useState({});

  const handleOptionSelect = (formId, optionKey, type) => {
    setAnswers(prevAnswers => {
      const currentSelection = prevAnswers[formId];

      if (type === 'single') {
       
        return {
          ...prevAnswers,
          [formId]: optionKey,
        };
      } else {
       
        const newSelection = currentSelection ? [...currentSelection] : [];
        const index = newSelection.indexOf(optionKey);

        if (index > -1) {
         
          newSelection.splice(index, 1);
        } else {
        
          newSelection.push(optionKey);
        }
        return {
          ...prevAnswers,
          [formId]: newSelection,
        };
      }
    });
  };
  const handelSubmit =()=>{
    console.log("Submitted Answers:", JSON.stringify(answers, null, 2));
    navigation.replace('MainTabs', { username: 'user' }); // need to correct this as i need to take the input from signin
  }

  const isOptionSelected = (formId, optionKey, type) => {
    const currentSelection = answers[formId];
    if (type === 'single') {
      return currentSelection === optionKey;
    } else {
      return Array.isArray(currentSelection) && currentSelection.includes(optionKey);
    }
  };

  const shouldFormBeVisible = (form) => {
    if (!form.dependsOn) {
      return true; 
    }
    const dependentFormAnswer = answers[form.dependsOn.formId];
    return dependentFormAnswer === form.dependsOn.value;
    
  };




  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.headerTitle}>Travel Preferences</Text>
      <Text style={styles.subHeader}>Please select your preferences below.</Text>

      {formData.map(form => {
        if (!shouldFormBeVisible(form)) {
          return null; 
        }

        return (
          <View key={form.id} style={styles.formSection}>
            <Text style={styles.formQuestion}>{form.question}</Text>
            <View style={styles.optionsContainer}>
              {form.options.map(option => {
                const selected = isOptionSelected(form.id, option.key, form.type);
                const iconName = form.type === 'single'
                  ? (selected ? 'radio-button-on' : 'radio-button-off')
                  : (selected ? 'checkbox-outline' : 'square-outline');
                const iconColor = selected ? '#007AFF' : '#666';

                return (
                  <TouchableOpacity
                    key={option.key}
                    style={styles.optionButton}
                    onPress={() => handleOptionSelect(form.id, option.key, form.type)}
                  >
                    <Ionicons name={iconName} size={24} color={iconColor} />
                    <Text style={styles.optionText}>{option.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}
      

      <TouchableOpacity style={styles.submitButton} onPress={handelSubmit}>
        <Text style={styles.submitButtonText}>Submit Preferences</Text>
      </TouchableOpacity>

      
     

    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: Platform.OS === 'android' ? 25 : 50, 
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  formQuestion: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
 
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionButton: { 
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  
  },
  
});