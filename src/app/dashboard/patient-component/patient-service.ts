import { Injectable, signal } from '@angular/core';

export interface PatientDetails {
  sex: string;
  dateOfBirth: string;
  age: string;
  contactNumber: string;
  email: string;
  emergencyContactNumber: string;
  residentialAddress: string;
  practice: string;
  provider: string;
  insurance: string;
  patientGroup: string;
  hcp: string;
  conditions: string[];
  additionalInfo: any[]; 
}

export interface Patient {
  patientId: string;
  practiceName: string;
  service: string[];
  patientName: string;
  lastNoteRecorded: string;
  details: PatientDetails; 
}
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  patients = signal<Patient[]>([
    {
      patientId: '001234',
      patientName: 'Mickey Mouse',
      practiceName: 'Neulife Healthcare',
      service: ['RPM', 'CCM'],
      lastNoteRecorded: '10 March 2023',
      details: {
        sex: 'Male',
        dateOfBirth: '12 October 1965',
        age: '62 Years',
        contactNumber: '+66 987 87654',
        email: 'mickeymouse@gmail.com',
        emergencyContactNumber: '+66 123 345626',
        residentialAddress: 'Virginia, US',
        practice: 'Neulife Healthcare',
        provider: 'Dr Warren Right',
        insurance: 'Humana',
        patientGroup: 'A',
        hcp: 'Adam Lavine',
        conditions: ['Diabetes'],
        additionalInfo: [],
      },
    },
    {
      patientId: '001235',
      patientName: 'Adam Sandler',
      practiceName: 'Neulife Healthcare',
      service: ['RPM'],
      lastNoteRecorded: '11 March 2023',
      details: {
        sex: 'Male',
        dateOfBirth: '1966',
        age: '61 Years',
        contactNumber: '+66 111 11111',
        email: 'adam@gmail.com',
        emergencyContactNumber: '+66 222 22222',
        residentialAddress: 'California, US',
        practice: 'Neulife Healthcare',
        provider: 'Dr Strange',
        insurance: 'Aetna',
        patientGroup: 'B',
        hcp: 'John Doe',
        conditions: ['Hypertension'],
        additionalInfo: [],
      },
    },
    {
      patientId: '001236',
      patientName: 'Clark Kent',
      practiceName: 'Neulife Healthcare',
      service: ['CCM'],
      lastNoteRecorded: '12 March 2023',
      details: {
        sex: 'Male',
        dateOfBirth: '1970',
        age: '54 Years',
        contactNumber: '+66 333 33333',
        email: 'clark@gmail.com',
        emergencyContactNumber: '+66 444 44444',
        residentialAddress: 'Metropolis',
        practice: 'Neulife Healthcare',
        provider: 'Dr Banner',
        insurance: 'Cigna',
        patientGroup: 'A',
        hcp: 'Lois Lane',
        conditions: ['Asthma'],
        additionalInfo: [],
      },
    },
    {
      patientId: '001237',
      patientName: 'Daisy Duck',
      practiceName: 'Neulife Healthcare',
      service: ['RPM', 'CCM'],
      lastNoteRecorded: '13 March 2023',
      details: {
        sex: 'Female',
        dateOfBirth: '1980',
        age: '44 Years',
        contactNumber: '+66 555 55555',
        email: 'daisy@gmail.com',
        emergencyContactNumber: '+66 666 66666',
        residentialAddress: 'Duckburg',
        practice: 'Neulife Healthcare',
        provider: 'Dr Who',
        insurance: 'Humana',
        patientGroup: 'C',
        hcp: 'Donald Duck',
        conditions: ['Flu'],
        additionalInfo: [],
      },
    },
    {
      patientId: '001238',
      patientName: 'Bruce Wayne',
      practiceName: 'Neulife Healthcare',
      service: ['RPM'],
      lastNoteRecorded: '14 March 2023',
      details: {
        sex: 'Male',
        dateOfBirth: '1975',
        age: '49 Years',
        contactNumber: '+66 777 77777',
        email: 'bruce@wayne.com',
        emergencyContactNumber: '+66 888 88888',
        residentialAddress: 'Gotham',
        practice: 'Neulife Healthcare',
        provider: 'Dr Banner',
        insurance: 'Aetna',
        patientGroup: 'VIP',
        hcp: 'Alfred',
        conditions: ['Stress'],
        additionalInfo: [],
      },
    },
    {
      patientId: '001239',
      patientName: 'Tony Stark',
      practiceName: 'Neulife Healthcare',
      service: ['CCM'],
      lastNoteRecorded: '15 March 2023',
      details: {
        sex: 'Male',
        dateOfBirth: '1970',
        age: '54 Years',
        contactNumber: '+66 999 99999',
        email: 'tony@stark.com',
        emergencyContactNumber: '+66 000 00000',
        residentialAddress: 'Malibu',
        practice: 'Neulife Healthcare',
        provider: 'Dr Strange',
        insurance: 'Cigna',
        patientGroup: 'VIP',
        hcp: 'Pepper',
        conditions: ['Heart'],
        additionalInfo: [],
      },
    },

    {
      patientId: '001240',
      patientName: 'Peter Parker',
      practiceName: 'Neulife Healthcare',
      service: ['RPM'],
      lastNoteRecorded: '16 March 2023',
      details: {
        sex: 'Male',
        dateOfBirth: '1995',
        age: '29 Years',
        contactNumber: '+66 121 21212',
        email: 'peter@gmail.com',
        emergencyContactNumber: '+66 232 32323',
        residentialAddress: 'New York',
        practice: 'Neulife Healthcare',
        provider: 'Dr Octavius',
        insurance: 'Humana',
        patientGroup: 'Student',
        hcp: 'May',
        conditions: ['Allergy'],
        additionalInfo: [],
      },
    },
    {
      patientId: '001241',
      patientName: 'Steve Rogers',
      practiceName: 'Neulife Healthcare',
      service: ['RPM', 'CCM'],
      lastNoteRecorded: '17 March 2023',
      details: {
        sex: 'Male',
        dateOfBirth: '1920',
        age: '104 Years',
        contactNumber: '+66 343 43434',
        email: 'steve@avengers.com',
        emergencyContactNumber: '+66 454 54545',
        residentialAddress: 'Brooklyn',
        practice: 'Neulife Healthcare',
        provider: 'Dr Banner',
        insurance: 'Shield',
        patientGroup: 'Special',
        hcp: 'Nick Fury',
        conditions: ['Serum'],
        additionalInfo: [],
      },
    },

    {
      patientId: '001242',
      patientName: 'Natasha Romanoff',
      practiceName: 'Neulife Healthcare',
      service: ['CCM'],
      lastNoteRecorded: '18 March 2023',
      details: {
        sex: 'Female',
        dateOfBirth: '1984',
        age: '40 Years',
        contactNumber: '+66 565 65656',
        email: 'natasha@avengers.com',
        emergencyContactNumber: '+66 676 76767',
        residentialAddress: 'Russia',
        practice: 'Neulife Healthcare',
        provider: 'Dr Strange',
        insurance: 'Aetna',
        patientGroup: 'Special',
        hcp: 'Clint',
        conditions: ['Injury'],
        additionalInfo: [],
      },
    },

    {
      patientId: '001243',
      patientName: 'Thor Odinson',
      practiceName: 'Neulife Healthcare',
      service: ['RPM'],
      lastNoteRecorded: '19 March 2023',
      details: {
        sex: 'Male',
        dateOfBirth: '1000',
        age: '1000+ Years',
        contactNumber: '+66 787 87878',
        email: 'thor@asgard.com',
        emergencyContactNumber: '+66 898 98989',
        residentialAddress: 'Asgard',
        practice: 'Neulife Healthcare',
        provider: 'Dr Odin',
        insurance: 'Asgardian',
        patientGroup: 'God',
        hcp: 'Loki',
        conditions: ['None'],
        additionalInfo: [],
      },
    },
  ]);
}
