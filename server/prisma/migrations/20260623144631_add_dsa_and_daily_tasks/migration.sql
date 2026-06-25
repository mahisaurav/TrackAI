-- CreateTable
CREATE TABLE "DsaProgress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "questionKey" VARCHAR(64) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "confidence" VARCHAR(20),
    "notes" JSONB,
    "lastRevision" TIMESTAMP(3),
    "nextRevision" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DsaProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DsaUserStats" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dailyGoal" INTEGER NOT NULL DEFAULT 3,
    "activityLog" JSONB NOT NULL DEFAULT '{}',
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "lastActiveDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DsaUserStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyTask" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "taskDate" DATE NOT NULL,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DsaProgress_userId_idx" ON "DsaProgress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DsaProgress_userId_questionKey_key" ON "DsaProgress"("userId", "questionKey");

-- CreateIndex
CREATE UNIQUE INDEX "DsaUserStats_userId_key" ON "DsaUserStats"("userId");

-- CreateIndex
CREATE INDEX "DailyTask_userId_idx" ON "DailyTask"("userId");

-- CreateIndex
CREATE INDEX "DailyTask_userId_taskDate_idx" ON "DailyTask"("userId", "taskDate");

-- AddForeignKey
ALTER TABLE "DsaProgress" ADD CONSTRAINT "DsaProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DsaUserStats" ADD CONSTRAINT "DsaUserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyTask" ADD CONSTRAINT "DailyTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
