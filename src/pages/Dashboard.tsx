import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { Schema } from "amplify/data/resource";
import { useNavigate } from 'react-router-dom';

const client = generateClient<Schema>();

export default function DashboardPage() {
  const [residents, setResidents] = useState<Schema["Client"]["type"][] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchResidents() {
      try {
        const { data: allResidents, errors } = await client.models.Client.list();

        const data = [allResidents[0]];
        console.log(data)
  
        if (errors) {
          throw new Error(errors.map((e) => e.message).join(', '));
        }

        if (data) {
            setResidents(data);

        }

      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  
    fetchResidents();
  }, [navigate]);
  return (
    <div>
      <h2>Residents List</h2>
    </div>
  );
}