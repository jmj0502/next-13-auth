'use client';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export default function SummitButton() {
    const { pending } = useFormStatus()

    return (
        <button disabled={pending}>
            {pending ? 'Submitting...' : 'Submit'}
        </button>
    )
}
