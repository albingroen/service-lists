-- CreateTable
CREATE TABLE "ListItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "listId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "List" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "passphrase" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ListItem" ADD FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE SET NULL ON UPDATE CASCADE;
