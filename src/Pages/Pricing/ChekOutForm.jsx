import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: 9.99 })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
            .catch(err => {
                console.error("Error creating payment intent", err);
            });
    }, [axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error: paymentMethodError } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (paymentMethodError) {
            setError(paymentMethodError.message);
            return;
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            setError(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            const payment = {
                name: user?.name,
                email: user?.email,
                price: 9.99,
                transactionId: paymentIntent.id,
                date: new Date(),
            };

            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for your payment",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch(err => {
                    console.error('Payment saving error:', err);
                });
        }
    };

    return (

        <form className="max-w-3xl mx-auto" onSubmit={handleSubmit}>
            <div className="flex justify-center mb-6">
                <h2 className="text-xl font-bold">Please pay for primium membership</h2>
            </div>
            <div className="mb-4">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="p-3 border rounded-lg"
                />
            </div>
            <button
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
                type="submit"
                disabled={!stripe || !clientSecret}
            >
                Pay
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {transactionId && <p className="text-green-500 mt-2">Your Transaction id: {transactionId}</p>}
        </form>

    );
};

export default CheckOutForm;
