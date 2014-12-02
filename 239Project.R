#Download data set from S3
download.file("https://s3-us-west-1.amazonaws.com/smartminers-bucket/BreastCancer.csv", destfile = "/tmp/BreastCancer.csv", method = "curl")
#Read the file into a data frame
BreastCancer <- read.csv("/tmp/BreastCancer.csv", header=FALSE)
View(BreastCancer)

#Add headers to the columns
names(BreastCancer) <- c("Id","ClumpThickness","CellSizeUniformity","CellShapeUniformity","MarginalAdhesion","SingleEpCellSize","BareNuclei","BlandChromatin","NormalNucleoli","Mitoses","Class")
View(BreastCancer)
str(BreastCancer)
colnames(mydata)

#Check if the columns have a p-value less than 0.05
cor.test(BreastCancer$NormalNucleoli, BreastCancer$Class)
cor.test(BreastCancer$ClumpThickness, BreastCancer$Class)

#Add another column called Diagnosis to make it more readable
Diagnosis = ifelse(BreastCancer$Class<=2, "Benign","Malignant")
BreastCancer = data.frame(BreastCancer, Diagnosis)
View(BreastCancer)

#Construct tree
install.packages("tree")
library(tree)
tree.breastcancer = tree(Diagnosis~.-Class, BreastCancer)
summary(tree.breastcancer)
plot(tree.breastcancer)
text(tree.breastcancer, pretty = 0)
tree.breastcancer = tree(Diagnosis~.-Class -Id, BreastCancer)

#Divide data set into training (400) and test data (299)
set.seed(2)
train = sample(1:nrow(BreastCancer), 400)
BreastCancer.test = BreastCancer[-train,]
Diagnosis.test = Diagnosis[-train]
tree.breastcancer = tree(Diagnosis~.-Class -Id, BreastCancer, subset = train)
tree.pred = predict(tree.breastcancer, BreastCancer.test, type="class")
#tree.pred is what is predicted and Diagnosis.test is the actual column
table(tree.pred, Diagnosis.test)
table(tree.pred) #Benign - 205, malignant - 94
table(Diagnosis.test) #Benign - 213, malignant - 86

#Replace question marks in the dataset to NA
BreastCancer[BreastCancer == '?'] <- NA
View (BreastCancer)

#Create new preprocessd Breast Cancer dataset
BreastCancer[!complete.cases(BreastCancer),]
newBreastCancer <- na.omit(BreastCancer)
View(newBreastCancer)

#Construct new Diagnosis column
newDiagnosis = ifelse(newBreastCancer$Class<=2, "Benign","Malignant")
newBreastCancer = data.frame(newBreastCancer, newDiagnosis)
View(newBreastCancer)

#Build data model again with new ratio
set.seed(2)
train = sample(1:nrow(newBreastCancer), 547)
newBreastCancer.test = newBreastCancer[-train,]
newDiagnosis.test = newDiagnosis[-train ]
tree.newbreastcancer = tree(newDiagnosis~.-Class -Id -Diagnosis, newBreastCancer, subset = train)
tree.newpred = predict(tree.newbreastcancer, newBreastCancer.test, type="class")
table(tree.newpred,newDiagnosis.test)
table(tree.newpred) #Benign - 117, Malignant - 66
table(newDiagnosis.test) #Benign - 118, Malignant - 65

#Build data model for random forest
install.packages("randomForest")
set.seed(1234)
ind <- sample(2, nrow(newBreastCancer), replace = TRUE, prob = c(0.9,0.1))
trainData <- newBreastCancer [ind ==1,]
testData <- newBreastCancer [ind==2,]
library(randomForest)
rf <- randomForest(newDiagnosis~.-Class -Id -Diagnosis, data=trainData, mtry=4, ntree = 1000, proximity = TRUE)
table(predict(rf), trainData$newDiagnosis)
table(predict(rf))
table(trainData$newDiagnosis)
diagnosisPred <- predict(rf, newdata = testData)
table(diagnosisPred, testData$newDiagnosis)
table(diagnosisPred)
table(testData$newDiagnosis)
mean(diagnosisPred == testData$newDiagnosis)
plot(margin(rf,testData$newDiagnosis))
varImpPlot(rf)



install.packages("RColorBrewer")
install.packages('rattle')
install.packages('rpart.plot')
install.packages('RColorBrewer')
install.packages("party")
install.packages("partykit")
install.packages("caret")
library(rpart)
library(rattle)
library(rpart.plot)
library(party)
library(RColorBrewer)
library(partykit)
library(caret)
tree.2 <- rpart(newDiagnosis ~ ClumpThickness + CellSizeUniformity + CellShapeUniformity + MarginalAdhesion + SingleEpCellSize + BareNuclei + BlandChromatin + NormalNucleoli + Mitoses, data = newBreastCancer, method="class")
fancyRpartPlot(tree.2)
prp(tree.2)


#Rpart
set.seed(2)
train = sample(1:nrow(newBreastCancer),670)
newBreastCancer.test = newBreastCancer[-train,]
newdiag.test = newDiagnosis[-train]
tree.6 <- rpart(newDiagnosis ~ ClumpThickness + CellSizeUniformity + CellShapeUniformity + MarginalAdhesion + SingleEpCellSize + BareNuclei + BlandChromatin + NormalNucleoli + Mitoses, data = newBreastCancer, subset=train)
tree.6pred <- predict(tree.6, newBreastCancer.test, type="class")
table(newdiag.test) #Benign 11 Malignant 2
table(tree.6pred) # Benign 12 Malignant 1
text(tree.6)
prp(tree.6)

post(tree.6, file = "~/Documents/tree.ps", title="Classification tree for Breast cancer prediction")












