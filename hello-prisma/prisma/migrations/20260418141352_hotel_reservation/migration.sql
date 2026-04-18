-- CreateTable
CREATE TABLE `bedtypes` (
    `BedTypeId` INTEGER NOT NULL AUTO_INCREMENT,
    `BedName` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `bedtypes_BedName_key`(`BedName`),
    PRIMARY KEY (`BedTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roomtypes` (
    `RoomTypeId` INTEGER NOT NULL AUTO_INCREMENT,
    `TypeName` VARCHAR(50) NOT NULL,
    `Description` TEXT NULL,

    UNIQUE INDEX `roomtypes_TypeName_key`(`TypeName`),
    PRIMARY KEY (`RoomTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `RoomId` INTEGER NOT NULL AUTO_INCREMENT,
    `RoomNumber` VARCHAR(20) NOT NULL,
    `RoomTypeId` INTEGER NOT NULL,
    `BedTypeId` INTEGER NOT NULL,
    `Floor` INTEGER NOT NULL,
    `MaxOccupancy` INTEGER NOT NULL,
    `BasePrice` DECIMAL(10, 2) NOT NULL,
    `Description` TEXT NULL,

    UNIQUE INDEX `rooms_RoomNumber_key`(`RoomNumber`),
    PRIMARY KEY (`RoomId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roomimages` (
    `ImageId` INTEGER NOT NULL AUTO_INCREMENT,
    `RoomId` INTEGER NOT NULL,
    `ImageURL` VARCHAR(1024) NOT NULL,

    PRIMARY KEY (`ImageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `amenities` (
    `AmenityId` INTEGER NOT NULL AUTO_INCREMENT,
    `AmenityName` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`AmenityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roomamenities` (
    `RoomAmenityId` INTEGER NOT NULL AUTO_INCREMENT,
    `RoomId` INTEGER NOT NULL,
    `AmenityId` INTEGER NOT NULL,

    INDEX `roomamenities_RoomId_idx`(`RoomId`),
    INDEX `roomamenities_AmenityId_idx`(`AmenityId`),
    PRIMARY KEY (`RoomAmenityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservations` (
    `ReservationId` INTEGER NOT NULL AUTO_INCREMENT,
    `UserId` INTEGER NOT NULL,
    `CheckInDate` DATE NOT NULL,
    `CheckOutDate` DATE NOT NULL,
    `Status` ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed') NULL DEFAULT 'Pending',
    `CreatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `reservations_UserId_idx`(`UserId`),
    PRIMARY KEY (`ReservationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservationrooms` (
    `ReservationRoomId` INTEGER NOT NULL AUTO_INCREMENT,
    `ReservationId` INTEGER NOT NULL,
    `RoomId` INTEGER NOT NULL,
    `PriceAtBooking` DECIMAL(10, 2) NOT NULL,

    INDEX `reservationrooms_ReservationId_idx`(`ReservationId`),
    INDEX `reservationrooms_RoomId_idx`(`RoomId`),
    PRIMARY KEY (`ReservationRoomId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `PaymentId` INTEGER NOT NULL AUTO_INCREMENT,
    `ReservationId` INTEGER NOT NULL,
    `Amount` DECIMAL(10, 2) NOT NULL,
    `PaymentMethod` ENUM('CreditCard', 'DebitCard', 'PayPal', 'Cash') NOT NULL,
    `PaymentStatus` ENUM('Pending', 'Completed', 'Failed') NULL DEFAULT 'Pending',
    `PaymentDate` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `payments_ReservationId_idx`(`ReservationId`),
    PRIMARY KEY (`PaymentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roomblocks` (
    `BlockId` INTEGER NOT NULL AUTO_INCREMENT,
    `RoomId` INTEGER NOT NULL,
    `BlockedFrom` DATE NOT NULL,
    `BlockedTo` DATE NOT NULL,
    `Reason` ENUM('Maintenance', 'Reserved', 'Cleaning') NULL DEFAULT 'Reserved',

    INDEX `roomblocks_RoomId_idx`(`RoomId`),
    PRIMARY KEY (`BlockId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `UserId` INTEGER NOT NULL AUTO_INCREMENT,
    `FullName` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    `PasswordHash` VARCHAR(255) NOT NULL,
    `IsVerified` BOOLEAN NULL DEFAULT false,
    `CreatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `users_Email_key`(`Email`),
    PRIMARY KEY (`UserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userauthproviders` (
    `AuthId` INTEGER NOT NULL AUTO_INCREMENT,
    `UserId` INTEGER NOT NULL,
    `Provider` ENUM('google', 'facebook') NOT NULL,
    `ProviderUserId` VARCHAR(255) NULL,
    `password_hash` VARCHAR(255) NULL,
    `CreatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `userauthproviders_UserId_idx`(`UserId`),
    PRIMARY KEY (`AuthId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_BedTypeId_fkey` FOREIGN KEY (`BedTypeId`) REFERENCES `bedtypes`(`BedTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_RoomTypeId_fkey` FOREIGN KEY (`RoomTypeId`) REFERENCES `roomtypes`(`RoomTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roomimages` ADD CONSTRAINT `roomimages_RoomId_fkey` FOREIGN KEY (`RoomId`) REFERENCES `rooms`(`RoomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roomamenities` ADD CONSTRAINT `roomamenities_RoomId_fkey` FOREIGN KEY (`RoomId`) REFERENCES `rooms`(`RoomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roomamenities` ADD CONSTRAINT `roomamenities_AmenityId_fkey` FOREIGN KEY (`AmenityId`) REFERENCES `amenities`(`AmenityId`) ON DELETE RESTRICT ON UPDATE CASCADE;
