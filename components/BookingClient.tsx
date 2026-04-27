"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"


interface Payment {
  PaymentId:     number
  ReservationId: number
  Amount:        number
  PaymentMethod: string
  PaymentStatus: string
  ReferenceCode: string | null
  PaymentDate:   string
}

interface ReservationRoom {
  PriceAtBooking: number
  room?: {
    RoomNumber: string
    roomtype?: { TypeName: string }
  }
}

interface Booking {
  ReservationId:  number
  GuestFirstName: string
  GuestLastName:  string
  CheckInDate:    string
  CheckOutDate:   string
  Status:         string
  CreatedAt:      string
  reservationrooms: ReservationRoom[]
  payments?:      Payment[]
}

const statusColor: Record<string, string> = {
  Pending:   "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Completed: "bg-blue-100 text-blue-700",
  NoShow:    "bg-gray-100 text-gray-600",
}

const paymentStatusColor: Record<string, string> = {
  Pending:              "bg-gray-100 text-gray-500",
  AwaitingVerification: "bg-yellow-100 text-yellow-700",
  Completed:            "bg-green-100 text-green-700",
  Failed:               "bg-red-100 text-red-700",
  Refunded:             "bg-purple-100 text-purple-700",
}

// ==============================
// PAYMENT MODAL COMPONENT
// ==============================
function PaymentModal({
  booking,
  totalAmount,
  onClose,
  onSuccess,
}: {
  booking:     Booking
  totalAmount: number
  onClose:     () => void
  onSuccess:   (ref: string, method: string, amount: number) => void
}) {
  const [method,    setMethod]    = useState("Cash")
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState("")

  const handleSubmit = async () => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/payment", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          reservationId: booking.ReservationId,
          paymentMethod: method,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Something went wrong")
        return
      }

      onSuccess(data.referenceCode, method, data.amount)

    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-5">

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Choose Payment Method</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>

        {/* Booking summary */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Booking ID</span>
            <span className="font-mono font-medium">#{booking.ReservationId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Guest</span>
            <span className="font-medium">{booking.GuestFirstName} {booking.GuestLastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Check-in</span>
            <span>{new Date(booking.CheckInDate).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Check-out</span>
            <span>{new Date(booking.CheckOutDate).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
          <div className="border-t pt-2 mt-2 flex justify-between">
            <span className="font-semibold">Total Amount</span>
            <span className="font-bold text-yellow-600 text-lg">₱{totalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Payment method selection */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Select payment method:</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: "Cash",       label: "💵 Cash",        desc: "Pay at front desk" },
              { value: "GCash",      label: "📱 GCash",       desc: "Show QR screenshot" },
              { value: "CreditCard", label: "💳 Credit Card", desc: "Swipe at front desk" },
              { value: "DebitCard",  label: "💳 Debit Card",  desc: "Swipe at front desk" },
            ].map((m) => (
              <button
                key={m.value}
                onClick={() => setMethod(m.value)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  method === m.value
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-medium text-sm">{m.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{m.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50
                     text-black font-semibold py-3 rounded-xl transition-colors"
        >
          {loading ? "Processing..." : "Submit Payment →"}
        </button>

        <p className="text-xs text-center text-gray-400">
          Your payment will be verified by front desk staff upon arrival.
        </p>
      </div>
    </div>
  )
}


function ReceiptModal({referenceCode,method,amount,booking,onClose,}: {referenceCode: string, method: string, amount: number, booking: Booking, onClose: () => void}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">

        <div className="text-center space-y-2">
          <div className="text-5xl">🧾</div>
          <h2 className="text-xl font-bold text-gray-800">Payment Submitted!</h2>
          <p className="text-sm text-gray-500">
            Please show this receipt to the front desk upon arrival.
          </p>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 text-center">
          <p className="text-xs text-yellow-600 font-medium uppercase tracking-wider mb-1">
            Your Reference Code
          </p>
          <p className="text-3xl font-bold font-mono text-yellow-700 tracking-widest">
            {referenceCode}
          </p>
        </div>

        {/* Receipt details */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Booking ID</span>
            <span className="font-mono">#{booking.ReservationId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Guest</span>
            <span>{booking.GuestFirstName} {booking.GuestLastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Check-in</span>
            <span>{new Date(booking.CheckInDate).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Payment Method</span>
            <span className="font-medium">{method}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-yellow-600">₱{amount.toLocaleString()}</span>
          </div>
        </div>

        {/* Instructions per method */}
        <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-700 space-y-1">
          <p className="font-semibold">📋 Instructions:</p>
          {method === "Cash" && (
            <p>Bring this reference code and pay at the front desk on your check-in date.</p>
          )}
          {method === "GCash" && (
            <p>Send <strong>₱{amount.toLocaleString()}</strong> to our GCash number <strong>0917-123-4567</strong>. Use your reference code as the note. Screenshot your GCash confirmation and show it at the front desk.</p>
          )}
          {(method === "CreditCard" || method === "DebitCard") && (
            <p>Your card will be charged at the front desk upon check-in. Please bring this reference code.</p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-xl
                       text-sm hover:bg-gray-50 transition-colors"
          >
            🖨️ Print
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-800 text-white py-2 rounded-xl
                       text-sm hover:bg-gray-700 transition-colors"
          >
            Done ✓
          </button>
        </div>

      </div>
    </div>
  )
}


export default function BookingClient({ bookings }: { bookings: Booking[] }) {
  const router = useRouter()

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showPaymentModal,  setShowPaymentModal]  = useState(false)
  const [showReceiptModal,  setShowReceiptModal]  = useState(false)
  const [receiptData, setReceiptData] = useState<{
    referenceCode: string
    method:        string
    amount:        number
  } | null>(null)

  const getTotal = (booking: Booking) => {
    const days = Math.ceil(
      (new Date(booking.CheckOutDate).getTime() - new Date(booking.CheckInDate).getTime())
      / (1000 * 60 * 60 * 24)
    )
    return booking.reservationrooms.reduce(
      (sum, r) => sum + Number(r.PriceAtBooking) * days,
      0
    )
  }

  const getPayment = (booking: Booking): Payment | null => {
    return booking.payments?.[0] ?? null
  }

  const handlePayClick = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = (ref: string, method: string, amount: number) => {
    setReceiptData({ referenceCode: ref, method, amount })
    setShowPaymentModal(false)
    setShowReceiptModal(true)
    router.refresh() 
  }

  const renderPaymentButton = (booking: Booking) => {
    const payment = getPayment(booking)

    // Not confirmed yet
    if (booking.Status === "Pending") {
      return (
        <span className="text-xs text-gray-400 italic">
          Waiting for admin approval...
        </span>
      )
    }

    // Confirmed — user can now pay
    if (booking.Status === "Confirmed" && !payment) {
      return (
        <button
          onClick={() => handlePayClick(booking)}
          className="mt-1 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600
                     text-black text-xs font-semibold rounded-lg transition-colors"
        >
          💳 Pay Now
        </button>
      )
    }

    // Payment submitted, waiting for staff
    if (payment?.PaymentStatus === "AwaitingVerification") {
      return (
        <div className="mt-1 space-y-1">
          <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
            ⏳ Payment Submitted
          </span>
          {payment.ReferenceCode && (
            <p className="text-xs text-gray-500 font-mono">
              Ref: <strong>{payment.ReferenceCode}</strong>
            </p>
          )}
          <p className="text-xs text-gray-400">Waiting for staff verification</p>
        </div>
      )
    }

    // Payment completed
    if (payment?.PaymentStatus === "Completed") {
      return (
        <div className="mt-1 space-y-1">
          <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
            ✓ Paid via {payment.PaymentMethod}
          </span>
          {payment.ReferenceCode && (
            <p className="text-xs text-gray-500 font-mono">
              Ref: {payment.ReferenceCode}
            </p>
          )}
        </div>
      )
    }

    if (booking.Status === "Cancelled" || booking.Status === "NoShow") {
      return (
        <span className="text-xs text-red-400">
          {booking.Status === "NoShow" ? "Marked as no-show" : "Booking cancelled"}
        </span>
      )
    }

    return null
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center text-gray-500 py-20">
        <p className="text-xl font-semibold">No reservations yet.</p>
        <p className="text-sm mt-1">Your bookings will appear here once you make a reservation.</p>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-5 py-3">Booking ID</th>
              <th className="px-5 py-3">Room</th>
              <th className="px-5 py-3">Guest Name</th>
              <th className="px-5 py-3">Check-in</th>
              <th className="px-5 py-3">Check-out</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((b) => {
              const room  = b.reservationrooms[0]
              const total = getTotal(b)

              return (
                <tr key={b.ReservationId} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-4 font-mono text-gray-400">
                    #{b.ReservationId}
                  </td>

                  <td className="px-5 py-4 font-medium">
                    {room?.room?.roomtype?.TypeName ?? "N/A"}
                    <span className="block text-xs text-gray-400">
                      Room {room?.room?.RoomNumber ?? "—"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {b.GuestFirstName} {b.GuestLastName}
                  </td>

                  <td className="px-5 py-4">
                    {new Date(b.CheckInDate).toLocaleDateString("en-PH", {
                      month: "short", day: "numeric", year: "numeric"
                    })}
                  </td>

                  <td className="px-5 py-4">
                    {new Date(b.CheckOutDate).toLocaleDateString("en-PH", {
                      month: "short", day: "numeric", year: "numeric"
                    })}
                  </td>

                  <td className="px-5 py-4 font-semibold text-yellow-600">
                    ₱{total.toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${statusColor[b.Status] ?? "bg-gray-100 text-gray-600"}`}>
                      {b.Status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {renderPaymentButton(b)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Payment modal */}
      {showPaymentModal && selectedBooking && (
        <PaymentModal
          booking={selectedBooking}
          totalAmount={getTotal(selectedBooking)}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Receipt modal */}
      {showReceiptModal && receiptData && selectedBooking && (
        <ReceiptModal
          referenceCode={receiptData.referenceCode}
          method={receiptData.method}
          amount={receiptData.amount}
          booking={selectedBooking}
          onClose={() => {
            setShowReceiptModal(false)
            setSelectedBooking(null)
          }}
        />
      )}
    </>
  )
}