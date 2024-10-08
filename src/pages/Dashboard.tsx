import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { Schema } from "amplify/data/resource";
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import DashboardCharts from '@/components/DashboardCharts';
import DashboardTable from '@/components/DashboardTable';
import DashboardSideInfo from '@/components/DashboardSideInfo';
import { Resident } from '@/lib/types';
import DashboardAddResident from '@/components/DashboardAddResident';

const client = generateClient<Schema>();

export default function DashboardPage() {
  const [residents, setResidents] = useState<Schema["Client"]["type"][] | null>(null);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [addResident, setAddResident] = useState<boolean>(false)
  const [newStatus, setNewStatus] = useState<boolean>(true)
  const [updateInvoice, setUpdateInvoice] = useState<boolean>(false)

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
          setResidents((prevResidents) => {
            // Ensure new reference for state comparison, even if the contents are the same
            if (JSON.stringify(prevResidents) !== JSON.stringify(allResidents)) {
              return [...allResidents]; // Force a re-render with a new array reference
            }
            return prevResidents; // If it's the same, keep the old state
          });
        }
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    }

    fetchResidents();
  }, [navigate, addResident, newStatus, updateInvoice]);


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
              setUpdateInvoice={setUpdateInvoice}
            />
          </div>
          <div className="lg:col-span-1">
            {
              !addResident ? 
              <DashboardSideInfo
              selectedResident={selectedResident}
              setSelectedResident={setSelectedResident}
              newStatus={newStatus}
              setNewStatus={setNewStatus}
              updateInvoice={updateInvoice}
              setUpdateInvoice={setUpdateInvoice}
            /> 
            :
            <DashboardAddResident
              setAddResident={setAddResident}
            />

            }
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