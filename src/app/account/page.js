'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Pencil, X, Loader2 } from 'lucide-react';

// TODO: replace this with however you actually get the logged-in user's
// data (context, a fetch call, props passed from a server component, etc).
// Whatever you use, it just needs to give you { name, email, image }.
const getLoggedInUser = () => ({
  name: '',   // e.g. "Rakibul Hasan"
  email: '',  // e.g. "rakibul@gmail.com" — this is the account email, always locked
  image: '',  // e.g. profile picture URL, leave empty if none
});

export default function ManageAccountPage() {
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Editable fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Snapshot used to restore values if the user clicks Cancel
  const [snapshot, setSnapshot] = useState({ fullName: '', phone: '', address: '' });

  // Account email + picture — locked, never editable
  const [email, setEmail] = useState('');
  const [accountImage, setAccountImage] = useState('');

  // Load logged-in user info + any previously saved profile edits
  useEffect(() => {
    const user = getLoggedInUser();
    setEmail(user.email);
    setAccountImage(user.image);

    const saved = JSON.parse(localStorage.getItem('profileData') || '{}');

    const initialName = saved.fullName ?? user.name ?? '';
    const initialPhone = saved.phone ?? '';
    const initialAddress = saved.address ?? '';

    setFullName(initialName);
    setPhone(initialPhone);
    setAddress(initialAddress);
    setSnapshot({ fullName: initialName, phone: initialPhone, address: initialAddress });
    setLoading(false);
  }, []);

  const handleEditClick = () => {
    if (isEditing) {
      // Currently editing -> this click is the Cancel action
      setFullName(snapshot.fullName);
      setPhone(snapshot.phone);
      setAddress(snapshot.address);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleSaveChange = async () => {
    setIsSaving(true);

    const updated = { fullName, phone, address };

    try {
      // Simulated persistence — swap this for your real API call
      // await fetch('/api/profile', { method: 'PUT', body: JSON.stringify(updated) });
      localStorage.setItem('profileData', JSON.stringify(updated));

      setSnapshot(updated);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const initial = fullName?.trim()?.charAt(0)?.toUpperCase() || '?';

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-8">
      <div className="rounded-2xl border border-gray-200 bg-white dark:bg-gray-800 p-6 shadow-sm sm:p-8">

          <div className=' flex items-center justify-between'>
        <h1 className="mb-2 text-xl font-semibold text-black dark:text-white sm:text-2xl">
          Manage My Account
        </h1>
         {/* Edit / Cancel button */}
        <div className="mt-7 flex justify-end">
          <button
            type="button"
            onClick={handleEditClick}
            className="flex h-10 w-10 mb-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-gray-700 dark:text-gray-100 transition hover:bg-gray-50 dark:hover:bg-gray-950"
            aria-label={isEditing ? 'Cancel editing' : 'Edit profile'}
          >
            {isEditing ? <X className="h-4 w-4 text-red-500" /> : <Pencil className="h-4 w-4" />}
          </button>
        </div>
        </div>

        {/* Avatar */}
        <div className="mb-8 flex justify-center">
          {accountImage ? (
            <img
              src={accountImage}
              alt={fullName || 'Profile picture'}
              className="h-24 w-24 rounded-full object-cover ring-2 ring-gray-100"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-900 text-3xl font-semibold text-white ring-2 ring-gray-100">
              {initial}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-100">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!isEditing}
              placeholder="Your full name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-black dark:text-white outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-100">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isEditing}
              placeholder="01XXXXXXXXX"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-black dark:text-white outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-100">
              Gmail
            </label>
            <input
              type="email"
              value={email}
              disabled
              readOnly
              className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-500"
            />
            <p className="mt-1 text-xs text-gray-400">
              This is your login email and cannot be changed.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-100">
              Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={!isEditing}
              placeholder="House, Road, Area, City"
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-black dark:text-white outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </div>

        {/* Save Change button — only visible while editing */}
        {isEditing && (
          <button
            type="button"
            onClick={handleSaveChange}
            disabled={isSaving}
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Change'
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// //////////////////////////////////////////////////////Auth//////////////////////////////////////////////////////////////////////////////////
// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { toast } from 'react-toastify';
// import { Pencil, X, Loader2 } from 'lucide-react';

// export default function ManageAccountPage() {
//   const { data: session, status } = useSession();

//   const [isEditing, setIsEditing] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   // Editable fields
//   const [fullName, setFullName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');

//   // Snapshot used to restore values if the user clicks Cancel
//   const [snapshot, setSnapshot] = useState({ fullName: '', phone: '', address: '' });

//   // Gmail is locked forever to the account you logged in with
//   const email = session?.user?.email || '';
//   const googleImage = session?.user?.image || '';
//   const googleName = session?.user?.name || '';

//   // Load saved profile data (falls back to Google name on first login)
//   useEffect(() => {
//     if (status !== 'authenticated') return;

//     const saved = JSON.parse(localStorage.getItem('profileData') || '{}');

//     const initialName = saved.fullName ?? googleName ?? '';
//     const initialPhone = saved.phone ?? '';
//     const initialAddress = saved.address ?? '';

//     setFullName(initialName);
//     setPhone(initialPhone);
//     setAddress(initialAddress);
//     setSnapshot({ fullName: initialName, phone: initialPhone, address: initialAddress });
//   }, [status, googleName]);

//   const handleEditClick = () => {
//     if (isEditing) {
//       // Currently editing -> this click is the Cancel action
//       setFullName(snapshot.fullName);
//       setPhone(snapshot.phone);
//       setAddress(snapshot.address);
//       setIsEditing(false);
//     } else {
//       setIsEditing(true);
//     }
//   };

//   const handleSaveChange = async () => {
//     setIsSaving(true);

//     const updated = { fullName, phone, address };

//     try {
//       // Simulated persistence — swap this for your real API call
//       // await fetch('/api/profile', { method: 'PUT', body: JSON.stringify(updated) });
//       localStorage.setItem('profileData', JSON.stringify(updated));

//       setSnapshot(updated);
//       setIsEditing(false);
//       toast.success('Profile updated successfully');
//     } catch (error) {
//       toast.error('Something went wrong. Please try again.');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const initial = fullName?.trim()?.charAt(0)?.toUpperCase() || '?';

//   if (status === 'loading') {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center">
//         <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto w-full max-w-xl px-4 py-10">
//       <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
//         <h1 className="mb-6 text-xl font-semibold text-black dark:text-white sm:text-2xl">
//           Manage My Account
//         </h1>

//         {/* Avatar */}
//         <div className="mb-8 flex justify-center">
//           {googleImage ? (
//             <img
//               src={googleImage}
//               alt={fullName || 'Profile picture'}
//               className="h-24 w-24 rounded-full object-cover ring-2 ring-gray-100"
//             />
//           ) : (
//             <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-900 text-3xl font-semibold text-white ring-2 ring-gray-100">
//               {initial}
//             </div>
//           )}
//         </div>

//         {/* Form */}
//         <div className="space-y-5">
//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-100">
//               Full Name
//             </label>
//             <input
//               type="text"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               disabled={!isEditing}
//               placeholder="Your full name"
//               className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-black dark:text-white outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
//             />
//           </div>

//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-100">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               disabled={!isEditing}
//               placeholder="01XXXXXXXXX"
//               className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-black dark:text-white outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
//             />
//           </div>

//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-100">
//               Gmail
//             </label>
//             <input
//               type="email"
//               value={email}
//               disabled
//               readOnly
//               className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-500"
//             />
//             <p className="mt-1 text-xs text-gray-400">
//               This is your login email and cannot be changed.
//             </p>
//           </div>

//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-100">
//               Address
//             </label>
//             <textarea
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               disabled={!isEditing}
//               placeholder="House, Road, Area, City"
//               rows={3}
//               className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-black dark:text-white outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
//             />
//           </div>
//         </div>

//         {/* Edit / Cancel button */}
//         <div className="mt-7 flex justify-end">
//           <button
//             type="button"
//             onClick={handleEditClick}
//             className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 dark:text-gray-100 transition hover:bg-gray-50"
//             aria-label={isEditing ? 'Cancel editing' : 'Edit profile'}
//           >
//             {isEditing ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
//           </button>
//         </div>

//         {/* Save Change button — only visible while editing */}
//         {isEditing && (
//           <button
//             type="button"
//             onClick={handleSaveChange}
//             disabled={isSaving}
//             className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {isSaving ? (
//               <>
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               'Save Change'
//             )}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }