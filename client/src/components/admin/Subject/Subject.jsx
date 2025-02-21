import React, { useEffect, useState } from 'react'
import { CallGetAllSubjects } from '../../../redux/reducers/subjects/getAllSubjects';

export default function Subject() {
    //Khai báo state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    //Gọi API lấy danh sách subject
    useEffect(() => {
        const fetchSubjects = async () => {
            await dispatchEvent(CallGetAllSubjects({
                keyword,
                sortBy: "name",
                page,
                limit,
                order,
            }));
        }
        fetchSubjects();
    }, [page, keyword, order, limit]);

    //Gọi API lấy danh sách subject
    useEffect(() => {
        const fetch = async () => {
            await dispatch(CallGetAllSubjects({
                keyword,
                sortBy: "name",
                page,
                limit,
                order,
            }));
        }
        fetch();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div>Subject</div>
    )
}
