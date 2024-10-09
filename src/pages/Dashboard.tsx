import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { Schema } from "amplify/data/resource";
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import DashboardCharts from '@/components/DashboardCharts';
import DashboardTable from '@/components/DashboardTable';
import DashboardSideInfo from '@/components/DashboardSideInfo';
import { Resident } from '@/lib/types';

const client = generateClient<Schema>();

export default function DashboardPage() {
  const [residents, setResidents] = useState<Schema["Client"]["type"][] | null>(null);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [addResident, setAddResident] = useState<boolean>(false)

  const navigate = useNavigate();

  console.log(addResident)

  useEffect(() => {
    async function fetchResidents() {
      try {
        const { data: allResidents, errors } = await client.models.Client.list();
        
        console.log(allResidents); // Check what is being returned

        if (errors) {
          throw new Error(errors.map((e) => e.message).join(', '));
        }

        if (allResidents) {
          setResidents(allResidents); // Set the entire list of residents
        }

      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    }

    fetchResidents();
  }, [navigate]);


  if (residents != null) {
  return (
    <div>
      <Navbar />
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"></header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
            <DashboardCharts residents={residents} />
            <DashboardTable
              residents={residents}
              setSelectedResident={setSelectedResident}
              setAddResident={setAddResident}
            />
          </div>
          <div className="lg:col-span-1">
            <DashboardSideInfo
              selectedResident={selectedResident}
            />
          </div>
        </main>
      </div>
    </div>
  </div>
  );
} else {
  return (
    <p>Loading...</p>
  )
}
}