// pages/diary/[userId]/create.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../../context/AuthContext';

const CreateDiaryPage = () => {
    const router = useRouter();
    const { userId } = router.query;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { user } = useAuth();

    const handleCreateDiary = async (e) => {
        e.preventDefault();
        try {
            const db = getFirestore();
            const diariesRef = collection(db, 'users', userId, 'diaries');
            await addDoc(diariesRef, {
                title,
                content,
                createdAt: new Date(),
                createdBy: user.uid, // Assuming you have access to the current user
            });
            router.push(`/diary/${userId}`);
        } catch (error) {
            console.error('Error creating diary:', error);
        }
    };

    return (
        <Layout>
            <div>
                <h1>Create Diary Entry</h1>
                <form onSubmit={handleCreateDiary}>
                    <div>
                        <label>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div >
                        <label>Content:</label>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>
        </Layout>
    );
};

export default CreateDiaryPage;