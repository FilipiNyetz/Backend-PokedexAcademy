-- CreateTable
CREATE TABLE "User" (
    "idUser" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "kit" INTEGER NOT NULL,
    "course" TEXT,
    "period" INTEGER,
    "birthday" TIMESTAMP(3) NOT NULL,
    "hackaton" BOOLEAN,
    "avaliableWork" BOOLEAN,
    "profilePicture" TEXT,
    "apps" TEXT[],
    "idPosition" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "Position" (
    "idPosition" TEXT NOT NULL,
    "namePosition" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("idPosition")
);

-- CreateTable
CREATE TABLE "Skill" (
    "idSkill" TEXT NOT NULL,
    "nameSkill" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("idSkill")
);

-- CreateTable
CREATE TABLE "UserSkill" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "UserSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "idGroup" TEXT NOT NULL,
    "nameGroup" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("idGroup")
);

-- CreateTable
CREATE TABLE "UserGroup" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "UserGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Position_namePosition_key" ON "Position"("namePosition");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_nameSkill_key" ON "Skill"("nameSkill");

-- CreateIndex
CREATE UNIQUE INDEX "UserSkill_userId_skillId_key" ON "UserSkill"("userId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "Group_nameGroup_key" ON "Group"("nameGroup");

-- CreateIndex
CREATE UNIQUE INDEX "UserGroup_userId_groupId_key" ON "UserGroup"("userId", "groupId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idPosition_fkey" FOREIGN KEY ("idPosition") REFERENCES "Position"("idPosition") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkill" ADD CONSTRAINT "UserSkill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkill" ADD CONSTRAINT "UserSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("idSkill") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("idGroup") ON DELETE RESTRICT ON UPDATE CASCADE;
