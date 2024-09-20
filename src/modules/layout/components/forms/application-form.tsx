import React, { FC, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import styles from "./Application.module.css";
import Link from "next/link";
import {
    Computer,
    Education,
    Experience,
    FamilyMember,
    Language,
    Learn,
    Org,
    Step2Props,
} from "@/lib/interface";
import Image from "next/legacy/image";

const fileTypes = ["PDF"];
const Application: FC<Step2Props> = ({
    formData,
    setFormData,
    prevStep,
    submitForm,
    job,
}) => {
    const [file, setFile] = useState(null);
    const [selectedReason, setSelectedReason] = useState<string>("");
    const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
        {
            name: "",
            register: "",
            age: "",
            relation: "",
            phone: "",
            employment: "",
        },
    ]);
    const [educationEntries, setEducationEntries] = useState<Education[]>([
        { schoolName: "", studyMode: "", degree: "", completionDate: "" },
    ]);
    const [orgEntries, setOrgEntries] = useState<Org[]>([
        { orgName: "", orgType: "", orgCompletionDate: "" },
    ]);
    const [learnEntries, setLearnEntries] = useState<Learn[]>([
        { lName: "", lSource: "" },
    ]);
    const [experienceEntries, setExperienceEntries] = useState<Experience[]>([
        {
            comName: "",
            comType: "",
            comOccupation: "",
            comWork: "",
            comExitReason: "",
            comTime: "",
            comConnection: "",
        },
    ]);
    const [computerEntries, setComputerEntries] = useState<Computer[]>([
        { computerName: "" },
    ]);
    const [languageEntries, setLanguageEntries] = useState<Language[]>([
        { languageName: "", languageSpeak: "", languageRead: "" },
    ]);
    const handleSelectedReasonChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedReason(event.target.value);
    };
    const handleFileChange = (file: any) => {
        setFile(file);
        setFormData({
            ...formData,
            file,
        });
    };
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleEntryChange = (
        entryType:
            | "family"
            | "education"
            | "org"
            | "learn"
            | "experience"
            | "computer"
            | "language",
        index: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        let updatedEntries;

        if (entryType === "family") {
            updatedEntries = [...familyMembers];
            updatedEntries[index] = {
                ...updatedEntries[index],
                [name]: value,
            };
            setFamilyMembers(updatedEntries);
            setFormData({
                ...formData,
                [`f${index + 1}_${name}`]: value,
            });
        } else if (entryType === "education") {
            updatedEntries = [...educationEntries];
            updatedEntries[index] = {
                ...updatedEntries[index],
                [name]: value,
            };
            setEducationEntries(updatedEntries);
            setFormData({
                ...formData,
                [`v_education${index + 1}_${name}`]: value,
            });
        } else if (entryType === "org") {
            updatedEntries = [...orgEntries];
            updatedEntries[index] = {
                ...updatedEntries[index],
                [name]: value,
            };
            setOrgEntries(updatedEntries);
            setFormData({
                ...formData,
                [`v_career${index + 1}_${name}`]: value,
            });
        } else if (entryType === "learn") {
            updatedEntries = [...learnEntries];
            updatedEntries[index] = {
                ...updatedEntries[index],
                [name]: value,
            };
            setLearnEntries(updatedEntries);
            setFormData({
                ...formData,
                [`v_learn${index + 1}_${name}`]: value,
            });
        } else if (entryType === "experience") {
            updatedEntries = [...experienceEntries];
            updatedEntries[index] = {
                ...updatedEntries[index],
                [name]: value,
            };
            setExperienceEntries(updatedEntries);

            setFormData({
                ...formData,
                [`ex${index + 1}_${name}`]: value,
            });
        } else if (entryType === "computer") {
            updatedEntries = [...computerEntries];
            updatedEntries[index] = {
                ...updatedEntries[index],
                [name]: value,
            };
            setComputerEntries(computerEntries);

            setFormData({
                ...formData,
                [`computer${index + 1}_${index + 1}`]: value,
            });
        } else if (entryType === "language") {
            updatedEntries = [...languageEntries];
            updatedEntries[index] = {
                ...updatedEntries[index],
                [name]: value,
            };
            setLanguageEntries(languageEntries);
            setFormData({
                ...formData,
                [`lg${index + 1}_${name}`]: value,
            });
        }
    };
    const addEntry = (
        entryType:
            | "family"
            | "education"
            | "org"
            | "learn"
            | "experience"
            | "computer"
            | "language"
    ) => {
        if (entryType === "family") {
            setFamilyMembers([
                ...familyMembers,
                {
                    name: "",
                    register: "",
                    age: "",
                    relation: "",
                    phone: "",
                    employment: "",
                },
            ]);
        } else if (entryType === "education") {
            setEducationEntries([
                ...educationEntries,
                { schoolName: "", studyMode: "", degree: "", completionDate: "" },
            ]);
        } else if (entryType === "org") {
            setOrgEntries([
                ...orgEntries,
                { orgName: "", orgType: "", orgCompletionDate: "" },
            ]);
        } else if (entryType === "learn") {
            setLearnEntries([...learnEntries, { lName: "", lSource: "" }]);
        } else if (entryType === "experience") {
            setExperienceEntries([
                ...experienceEntries,
                {
                    comName: "",
                    comType: "",
                    comOccupation: "",
                    comWork: "",
                    comExitReason: "",
                    comTime: "",
                    comConnection: "",
                },
            ]);
        } else if (entryType === "computer") {
            setComputerEntries([...computerEntries, { computerName: "" }]);
        } else if (entryType === "language") {
            setLanguageEntries([
                ...languageEntries,
                { languageName: "", languageSpeak: "", languageRead: "" },
            ]);
        }
    };
    const removeEntry = (
        entryType:
            | "family"
            | "education"
            | "org"
            | "learn"
            | "experience"
            | "computer"
            | "language",
        index: number
    ) => {
        if (entryType === "family" && familyMembers.length > 1) {
            const updatedFamilyMembers = familyMembers.filter((_, i) => i !== index);
            setFamilyMembers(updatedFamilyMembers);

            const newFormData: any = { ...formData };
            Object.keys(formData).forEach((key) => {
                if (key.startsWith(`f${index + 1}_`)) {
                    delete newFormData[key];
                }
            });
            setFormData(newFormData);
        } else if (entryType === "education" && educationEntries.length > 1) {
            const updatedEducationEntries = educationEntries.filter(
                (_, i) => i !== index
            );
            setEducationEntries(updatedEducationEntries);

            const newFormData: any = { ...formData };
            Object.keys(formData).forEach((key) => {
                if (key.startsWith(`v_education${index + 1}_`)) {
                    delete newFormData[key];
                }
            });
            setFormData(newFormData);
        } else if (entryType === "org" && orgEntries.length > 1) {
            const updatedOrgEntries = orgEntries.filter((_, i) => i !== index);
            setOrgEntries(updatedOrgEntries);

            const newFormData: any = { ...formData };
            Object.keys(formData).forEach((key) => {
                if (key.startsWith(`v_career${index + 1}_`)) {
                    delete newFormData[key];
                }
            });
            setFormData(newFormData);
        } else if (entryType === "learn" && learnEntries.length > 1) {
            const updatedLearnEntries = learnEntries.filter((_, i) => i !== index);
            setLearnEntries(updatedLearnEntries);

            const newFormData: any = { ...formData };
            Object.keys(formData).forEach((key) => {
                if (key.startsWith(`v_learn${index + 1}_`)) {
                    delete newFormData[key];
                }
            });
            setFormData(newFormData);
        } else if (entryType === "experience" && experienceEntries.length > 1) {
            const updatedExperienceEntries = experienceEntries.filter(
                (_, i) => i !== index
            );
            setExperienceEntries(updatedExperienceEntries);

            const newFormData: any = { ...formData };
            Object.keys(formData).forEach((key) => {
                if (key.startsWith(`ex${index + 1}_`)) {
                    delete newFormData[key];
                }
            });
            setFormData(newFormData);
        } else if (entryType === "computer" && computerEntries.length > 1) {
            const updatedComputerEntries = computerEntries.filter(
                (_, i) => i !== index
            );
            setComputerEntries(updatedComputerEntries);

            const newFormData: any = { ...formData };
            Object.keys(formData).forEach((key) => {
                if (key.startsWith(`computer${index + 1}_`)) {
                    delete newFormData[key];
                }
            });
            setFormData(newFormData);
        } else if (entryType === "language" && languageEntries.length > 1) {
            const updatedLanguageEntries = languageEntries.filter(
                (_, i) => i !== index
            );
            setLanguageEntries(updatedLanguageEntries);

            const newFormData: any = { ...formData };
            Object.keys(formData).forEach((key) => {
                if (key.startsWith(`lg${index + 1}_`)) {
                    delete newFormData[key];
                }
            });
            setFormData(newFormData);
        }
    };
    const isNextDisabled = !formData.ner;

    return (
        <div className={styles.gnewtonCareerBodyClass}>
            <div className="questions">
                <b>{job ? job : ""}</b>
                <div className="leading-6">
                    Сонирхсонд баярлалаа. Доорх талбаруудыг бөглөөд "Илгээх" дээр дарна
                    уу.
                </div>
            </div>
            <div className="dashed border-dashed mt-1 mb-1 w-full"></div>
            <form id="uploadResume" name="uploadResume" className="gnewtonSectionClass">
                <dl>
                    <dt className={styles.gnewtonSectionTitleClass}>CV оруулах</dt>
                    <dd>
                        <FileUploader
                            classes="custom-fileUploader"
                            handleChange={handleFileChange}
                            name="file"
                            multiple={false}
                            maxSize={2}
                            types={fileTypes}
                        />
                    </dd>
                </dl>
            </form>
            <form id="uploadForm" name="uploadForm" className={styles.gnewtonSectionClass}>
                <dl>
                    <dt className={styles.gnewtonSectionTitleClass}>Ерөнхий мэдээлэл</dt>
                    <dd>
                        <div className={styles.gnewtonFieldLabelClass}>
                            <label className="font-normal capitalize" htmlFor="obog">
                                Эцэг, (Эх)
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <input
                                type="text"
                                name="obog"
                                value={formData.obog}
                                onChange={handleChange}
                                maxLength={30}
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonFieldLabelClass}>
                            <label className="font-normal capitalize" htmlFor="ner">
                                Өөрийн нэр
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <input
                                type="text"
                                name="ner"
                                value={formData.ner}
                                onChange={handleChange}
                                maxLength={30}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonQuestionLabelClass}>
                            <label className="font-normal capitalize" htmlFor="work_type">
                                Таны өргөдөл гаргаж буй ажлын байр
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <input
                                type="text"
                                name="work_type"
                                value={formData.work_type}
                                onChange={handleChange}
                                maxLength={30}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonFieldLabelClass}>
                            <label className="font-normal capitalize" htmlFor="city">
                                Хот
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                maxLength={30}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonFieldLabelClass}>
                            <label className="font-normal capitalize" htmlFor="address">
                                Гэрийн хаяг
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                maxLength={30}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonFieldLabelClass}>
                            <label className="font-normal capitalize" htmlFor="phone1">
                                Гар утас 1
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <input
                                type="text"
                                name="phone1"
                                value={formData.phone1}
                                onChange={handleChange}
                                maxLength={30}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonFieldLabelClass}>
                            <label className="font-normal capitalize" htmlFor="phone2">
                                Гар утас 2
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <input
                                type="text"
                                name="phone2"
                                value={formData.phone2}
                                onChange={handleChange}
                                maxLength={30}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonFieldLabelClass}>
                            <label className="font-normal capitalize" htmlFor="mail">
                                И-мэйл хаяг
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <input
                                type="email"
                                name="mail"
                                value={formData.mail}
                                onChange={handleChange}
                                maxLength={30}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonFieldLabelClass}>
                            <label className="font-normal capitalize" htmlFor="born1">
                                Төрсөн он,сар,өдөр
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <input
                                type="date"
                                name="born1"
                                value={formData.born1}
                                onChange={handleChange}
                                maxLength={30}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonFieldLabelClass}>
                            <label className="font-normal capitalize" htmlFor="married">
                                Гэрлэсэн эсэх
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <select
                                id="married"
                                name="married"
                                value={formData.married}
                                onChange={handleChange}
                                title="Married"
                            >
                                <option value="Yes">Тийм</option>
                                <option value="No">Үгүй</option>
                            </select>
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonFieldLabelClass}>
                            <label className="font-normal capitalize" htmlFor="register">
                                Регистрийн дугаар
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <input
                                type="text"
                                name="register"
                                value={formData.register}
                                onChange={handleChange}
                                maxLength={30}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonFieldLabelClass}>
                            <label className="font-normal capitalize" htmlFor="gender">
                                Хүйс
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                title="Gender"
                            >
                                <option value="Yes">Эрэгтэй</option>
                                <option value="No">Эмэгтэй</option>
                            </select>
                        </div>
                    </dd>
                </dl>
                <dl>
                    <dt className={styles.gnewtonSectionTitleClass}>Боловсрол</dt>
                    {educationEntries.map((edu, index) => (
                        <div key={index} className="flex ">
                            <div className="flex-1 custom-section relative max-w-[555px]">
                                <dd>
                                    <div className={styles.gnewtonQuestionLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`v_education${index + 1}_1`}
                                        >
                                            Төгссөн сургуулийн нэр
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="schoolName"
                                            value={edu.schoolName}
                                            onChange={(e) => handleEntryChange("education", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonQuestionLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`v_education${index + 1}_2`}
                                        >
                                            Суралцсан хэлбэр (танхим/онлайн)
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="studyMode"
                                            value={edu.studyMode}
                                            onChange={(e) => handleEntryChange("education", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonQuestionLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`v_education${index + 1}_3`}
                                        >
                                            Зэрэг( Мэргэжил )
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="degree"
                                            value={edu.degree}
                                            onChange={(e) => handleEntryChange("education", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonQuestionLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`v_education${index + 1}_4`}
                                        >
                                            Төгссөн огноо
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="date"
                                            name="completionDate"
                                            value={edu.completionDate}
                                            onChange={(e) => handleEntryChange("education", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                {index != 0 && (
                                    <button
                                        className="float-right"
                                        type="button"
                                        onClick={() => removeEntry("education", index)}
                                    >
                                        <Image
                                            src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/delete-icon.svg"
                                            width={28}
                                            height={28}
                                        />
                                    </button>
                                )}
                            </div>
                            {index === educationEntries.length - 1 && (
                                <div className="ml-4">
                                    <div
                                        className="h-[32px] bg-gray-100 text-white rounded hover:bg-gray-200 cursor-pointer"
                                        onClick={() => addEntry("education")}
                                    >
                                        <Image
                                            src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/plus-icon.svg"
                                            width={32}
                                            height={32}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </dl>
                <dl>
                    <dt className={styles.gnewtonSectionTitleClass}>
                        Мэргэшсэн байдал / Сургалт /
                    </dt>
                    {orgEntries.map((org, index) => (
                        <div key={index} className="flex ">
                            <div className="flex-1 custom-section relative max-w-[555px]">
                                <dd>
                                    <div className={styles.gnewtonQuestionLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`v_career${index + 1}_1`}
                                        >
                                            Сургалтын байгууллагын нэр
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="orgName"
                                            value={org.orgName}
                                            onChange={(e) => handleEntryChange("org", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonQuestionLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`v_career${index + 1}_2`}
                                        >
                                            Чиглэл
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="orgType"
                                            value={org.orgType}
                                            onChange={(e) => handleEntryChange("org", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonQuestionLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`v_career${index + 1}_3`}
                                        >
                                            Хамрагдсан хугацаа, байршил
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="orgCompletionDate"
                                            value={org.orgCompletionDate}
                                            onChange={(e) => handleEntryChange("org", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                {index != 0 && (
                                    <button
                                        className="float-right"
                                        type="button"
                                        onClick={() => removeEntry("org", index)}
                                    >
                                        <Image
                                            src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/delete-icon.svg"
                                            width={28}
                                            height={28}
                                        />
                                    </button>
                                )}
                            </div>
                            {index === educationEntries.length - 1 && (
                                <div className="ml-4">
                                    <div
                                        className="h-[32px] bg-gray-100 text-white rounded hover:bg-gray-200 cursor-pointer"
                                        onClick={() => addEntry("education")}
                                    >
                                        <Image
                                            src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/plus-icon.svg"
                                            width={32}
                                            height={32}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </dl>
                <dl>
                    <dt className={styles.gnewtonSectionTitleClass}>
                        Бие даан суралцсан байдал
                    </dt>
                    {learnEntries.map((lea, index) => (
                        <div key={index} className="flex ">
                            <div className="flex-1 custom-section relative max-w-[555px]">
                                <dd>
                                    <div className={styles.gnewtonFieldLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`v_learn${index + 1}_1`}
                                        >
                                            Хичээлийн нэр
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="lName"
                                            value={lea.lName}
                                            onChange={(e) => handleEntryChange("learn", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonFieldLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`v_learn${index + 1}_2`}
                                        >
                                            Эх сурвалж
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="lSource"
                                            value={lea.lSource}
                                            onChange={(e) => handleEntryChange("learn", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                {index != 0 && (
                                    <button
                                        className="float-right"
                                        type="button"
                                        onClick={() => removeEntry("learn", index)}
                                    >
                                        <Image
                                            src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/delete-icon.svg"
                                            width={28}
                                            height={28}
                                        />
                                    </button>
                                )}
                            </div>
                            {index === educationEntries.length - 1 && (
                                <div className="ml-4">
                                    <div
                                        className="h-[32px] bg-gray-100 text-white rounded hover:bg-gray-200 cursor-pointer"
                                        onClick={() => addEntry("learn")}
                                    >
                                        <Image
                                            src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/plus-icon.svg"
                                            width={32}
                                            height={32}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </dl>
                <dl>
                    <dt className={styles.gnewtonSectionTitleClass}>
                        Ажлын туршлага (Хамгийн сүүлийн туршлагаас эхлэн бичих)
                    </dt>
                    {experienceEntries.map((experience, index) => (
                        <div key={index} className="flex ">
                            <div className="flex-1 custom-section relative max-w-[555px]">
                                <dd>
                                    <div className={styles.gnewtonFieldLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`ex${index + 1}_1`}
                                        >
                                            Компанийн нэр
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="comName"
                                            value={experience.comName}
                                            onChange={(e) => handleEntryChange("experience", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonQuestionLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`ex${index + 1}_2`}
                                        >
                                            Үйл ажиллагааны чиглэл
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="comType"
                                            value={experience.comType}
                                            onChange={(e) => handleEntryChange("experience", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonQuestionLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`ex${index + 1}_3`}
                                        >
                                            Ажлын байрны нэр
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="comOccupation"
                                            value={experience.comOccupation}
                                            onChange={(e) => handleEntryChange("experience", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonQuestionLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`ex${index + 1}_4`}
                                        >
                                            Гүйцэтгэж байсан ажил үүргийн жагсаалт
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <textarea
                                            name="comWork"
                                            value={experience.comWork}
                                            onChange={(e) => handleEntryChange("experience", index, e)}
                                            rows={4}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonQuestionLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`ex${index + 1}_5`}
                                        >
                                            Ажлаас гарах болсон шалтгаан:
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <textarea
                                            name="comExitReason"
                                            value={experience.comExitReason}
                                            onChange={(e) => handleEntryChange("experience", index, e)}
                                            rows={4}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonQuestionLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`ex${index + 1}_6`}
                                        >
                                            Ажилласан хугацаа
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="comTime"
                                            value={experience.comTime}
                                            onChange={(e) => handleEntryChange("experience", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonQuestionLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`ex${index + 1}_7`}
                                        >
                                            Таны шууд удирдлагын нэр, холбоо барих утас
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="comConnection"
                                            value={experience.comConnection}
                                            onChange={(e) => handleEntryChange("experience", index, e)}
                                            maxLength={60}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                {index != 0 && (
                                    <button
                                        className="float-right"
                                        type="button"
                                        onClick={() => removeEntry("experience", index)}
                                    >
                                        <Image
                                            src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/delete-icon.svg"
                                            width={28}
                                            height={28}
                                        />
                                    </button>
                                )}
                            </div>
                            {index === educationEntries.length - 1 && (
                                <div className="ml-4">
                                    <div
                                        className="h-[32px] bg-gray-100 text-white rounded hover:bg-gray-200 cursor-pointer"
                                        onClick={() => addEntry("experience")}
                                    >
                                        <Image
                                            src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/plus-icon.svg"
                                            width={32}
                                            height={32}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </dl>
                <dl>
                    <dt className={styles.gnewtonSectionTitleClass}></dt>
                    <dd>
                        <div className={styles.gnewtonQuestionLabelClass}>
                            <label className="font-normal capitalize" htmlFor="car_learn">
                                CAT тоног төхөөрөмжтэй ажиллаж байсан туршлага, сурч мэдсэн
                                зүйлс
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <input
                                type="text"
                                name="car_learn"
                                value={formData.car_learn}
                                onChange={handleChange}
                                maxLength={30}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonQuestionLabelClass}>
                            <label className="font-normal capitalize" htmlFor="salary">
                                Таны цалингийн хүлээлт:
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <input
                                type="text"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                maxLength={30}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonFieldLabelClass}>
                            <label className="font-normal capitalize" htmlFor="sale_learn">
                                Таны борлуулалтын туршлага (Байгаа бол дурдана уу){" "}
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <textarea
                                name="sale_learn"
                                rows={4}
                                value={formData.sale_learn}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                </dl>
                <dl>
                    <dt className={styles.gnewtonSectionTitleClass}>
                        Компьютерийн мэдлэг
                    </dt>
                    {computerEntries.map((com, index) => (
                        <div key={index} className="flex ">
                            <div className="flex-1 custom-section relative max-w-[555px]">
                                <dd>
                                    <div className={styles.gnewtonQuestionLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`computer${index + 1}_1`}
                                        >
                                            Таны хамгийн сайн ажиллаж чаддаг программуудаа жагсаана уу
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="computerName"
                                            value={com.computerName}
                                            onChange={(e) => handleEntryChange("computer", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                {index != 0 && (
                                    <button
                                        className="float-right"
                                        type="button"
                                        onClick={() => removeEntry("computer", index)}
                                    >
                                        <Image
                                            src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/delete-icon.svg"
                                            width={28}
                                            height={28}
                                        />
                                    </button>
                                )}
                            </div>
                            {index === educationEntries.length - 1 && (
                                <div className="ml-4">
                                    <div
                                        className="h-[32px] bg-gray-100 text-white rounded hover:bg-gray-200 cursor-pointer"
                                        onClick={() => addEntry("computer")}
                                    >
                                        <Image
                                            src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/plus-icon.svg"
                                            width={32}
                                            height={32}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </dl>
                <dl>
                    <dt className={styles.gnewtonSectionTitleClass}>
                        Гадаад хэлний мэдлэг
                    </dt>
                    {languageEntries.map((lang, index) => (
                        <div key={index} className="flex ">
                            <div className="flex-1 custom-section relative max-w-[555px]">
                                <dd>
                                    <div className={styles.gnewtonFieldLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`lg${index + 1}_1`}
                                        >
                                            Гадаад хэл
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="languageName"
                                            value={lang.languageName}
                                            onChange={(e) => handleEntryChange("computer", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonFieldLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`lg${index + 1}_2`}
                                        >
                                            Ярих чадвар
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <select
                                            id={`lg${index + 1}_2`}
                                            name="languageSpeak"
                                            value={lang.languageSpeak}
                                            onChange={(e) => handleEntryChange("language", index, e)}
                                            title="Lg"
                                        >
                                            <option value="Yes">Анхан</option>
                                            <option value="No">Дунд</option>
                                            <option value="No">Ахисан</option>
                                        </select>
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonFieldLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`lg${index + 1}_3`}
                                        >
                                            Бичих чадвар
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <select
                                            id={`lg${index + 1}_3`}
                                            name="languageRead"
                                            value={lang.languageRead}
                                            onChange={(e) => handleEntryChange("language", index, e)}
                                            title="Lg"
                                        >
                                            <option value="Yes">Анхан</option>
                                            <option value="No">Дунд</option>
                                            <option value="No">Ахисан</option>
                                        </select>
                                    </div>
                                </dd>
                                {index != 0 && (
                                    <button
                                        className="float-right"
                                        type="button"
                                        onClick={() => removeEntry("language", index)}
                                    >
                                        <Image
                                            src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/delete-icon.svg"
                                            width={28}
                                            height={28}
                                        />
                                    </button>
                                )}
                            </div>
                            {index === educationEntries.length - 1 && (
                                <div className="ml-4">
                                    <div
                                        className="h-[32px] bg-gray-100 text-white rounded hover:bg-gray-200 cursor-pointer"
                                        onClick={() => addEntry("language")}
                                    >
                                        <Image
                                            src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/plus-icon.svg"
                                            width={32}
                                            height={32}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </dl>
                <dl>
                    <dt className={styles.gnewtonSectionTitleClass}>
                        Мэргэжлийн бусад ур чадвар
                    </dt>
                    <dd>
                        <div className={styles.gnewtonFieldLabelClass}>
                            <label
                                className="font-normal capitalize"
                                htmlFor="other_talent"
                            ></label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <textarea
                                name="other_talent"
                                rows={4}
                                value={formData.other_talent}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonFieldLabelClass}>
                            <label className="font-normal capitalize" htmlFor="car_password">
                                Жолооны үнэмлэх
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <input
                                type="text"
                                name="car_password"
                                value={formData.car_password}
                                onChange={handleChange}
                                maxLength={30}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonFieldLabelClass}>
                            <label
                                className="font-normal capitalize"
                                htmlFor="car_password_type"
                            >
                                Ангилал
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <input
                                type="text"
                                name="car_password_type"
                                value={formData.car_password_type}
                                onChange={handleChange}
                                maxLength={30}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonQuestionLabelClass}>
                            <label className="font-normal capitalize" htmlFor="career_skill1">
                                Мэргэжлийн ур чадвараа өөрөө дүгнэн бичнэ үү (Өөрийн сонирхож
                                буй ажлын байранд уялдуулан бичнэ үү)
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <textarea
                                name="career_skill1"
                                rows={4}
                                value={formData.career_skill1}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonQuestionLabelClass}>
                            <label className="font-normal capitalize" htmlFor="career_skill2">
                                Ажлын арга барил
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <textarea
                                name="career_skill2"
                                rows={4}
                                value={formData.career_skill2}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonQuestionLabelClass}>
                            <label className="font-normal capitalize" htmlFor="hobby">
                                Хобби
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <textarea
                                name="hobby"
                                rows={4}
                                value={formData.hobby}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonQuestionLabelClass}>
                            <label className="font-normal capitalize" htmlFor="other_add">
                                Нэмэлт мэдээлэл
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <textarea
                                name="other_add"
                                rows={4}
                                value={formData.other_add}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonQuestionLabelClass}>
                            <label className="font-normal capitalize" htmlFor="job_contact">
                                Та манай компанийн талаарх мэдээллийг ямар эх сурвалжаас олж
                                мэдсэн болох
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <input
                                type="text"
                                name="job_contact"
                                value={formData.job_contact}
                                onChange={handleChange}
                                maxLength={30}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonQuestionLabelClass}>
                            <label className="font-normal capitalize" htmlFor="wish_message">
                                Та Barloworld Mongolia LLC компанид яагаад ажиллах хүсэлтэй
                                байгаа болох
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <input
                                type="text"
                                name="wish_message"
                                value={formData.wish_message}
                                onChange={handleChange}
                                maxLength={30}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                </dl>
                <dl>
                    <dt className={styles.gnewtonSectionTitleClass}>
                        Гэр бүлийн гишүүдийн талаарх мэдээлэл
                    </dt>
                    {familyMembers.map((member, index) => (
                        <div key={index} className="flex ">
                            <div className="flex-1 custom-section relative max-w-[555px]">
                                <dd>
                                    <div className={styles.gnewtonFieldLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`f${index + 1}_1`}
                                        >
                                            Нэр
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="name"
                                            value={member.name}
                                            onChange={(e) => handleEntryChange("family", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonFieldLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`f${index + 1}_2`}
                                        >
                                            Регистрийн дугаар
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="register"
                                            value={member.register}
                                            onChange={(e) => handleEntryChange("family", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonFieldLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`f${index + 1}_3`}
                                        >
                                            Нас
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="age"
                                            value={member.age}
                                            onChange={(e) => handleEntryChange("family", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonFieldLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`f${index + 1}_4`}
                                        >
                                            Таны хэн болох
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="relation"
                                            value={member.relation}
                                            onChange={(e) => handleEntryChange("family", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonFieldLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`f${index + 1}_5`}
                                        >
                                            Утасны дугаар
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={member.phone}
                                            onChange={(e) => handleEntryChange("family", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                <dd>
                                    <div className={styles.gnewtonFieldLabelClass}>
                                        <label
                                            className="font-normal capitalize"
                                            htmlFor={`f${index + 1}_6`}
                                        >
                                            Ажил эрхлэлт
                                        </label>
                                    </div>
                                    <div className={styles.gnewtonFieldInputClass}>
                                        <input
                                            type="text"
                                            name="employment"
                                            value={member.employment}
                                            onChange={(e) => handleEntryChange("family", index, e)}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                    </div>
                                </dd>
                                {index != 0 && (
                                    <button
                                        className="float-right"
                                        type="button"
                                        onClick={() => removeEntry("family", index)}
                                    >
                                        <Image
                                            src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/delete-icon.svg"
                                            width={28}
                                            height={28}
                                        />
                                    </button>
                                )}
                            </div>
                            {index === familyMembers.length - 1 && (
                                <div className="ml-4">
                                    <div
                                        className="h-[32px] bg-gray-100 text-white rounded hover:bg-gray-200 cursor-pointer"
                                        onClick={() => addEntry("family")}
                                    >
                                        <Image
                                            src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/plus-icon.svg"
                                            width={32}
                                            height={32}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </dl>
                <dl>
                    <dd>
                        <div className={styles.gnewtonQuestionLabelClass}>
                            <label className="capitalize" htmlFor="pain">
                                1.Таныг ажлаа хийхэд эрсдэлд оруулж болзошгүй эрүүл мэндийн
                                асуудал (архаг өвчин, харшил гэх мэт) байгаа юу?
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <select
                                id="pain"
                                name="pain"
                                title="Pain"
                                value={formData.pain}
                                onChange={handleChange}
                            >
                                <option value="Yes">Тийм</option>
                                <option value="No">Үгүй</option>
                            </select>
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonQuestionLabelClass}>
                            <label className="capitalize" htmlFor="friend_in_job">
                                2. Танд тус компанид ажилладаг Барловорлд ашиг сонирхлын
                                зөрчлийн бодлогод тодорхойлсон "Найз" эсвэл "дотны гэр бүлийн
                                гишүүн" бий юу?
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <select
                                id="friend_in_job"
                                name="friend_in_job"
                                title="Friend"
                                value={formData.friend_in_job}
                                onChange={handleChange}
                            >
                                <option value="Yes">Тийм</option>
                                <option value="No">Үгүй</option>
                            </select>
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonQuestionLabelClass}>
                            <label
                                className="font-normal lowercase"
                                htmlFor="friend_in_job_text"
                            >
                                <b>
                                    3. Танд тус компанид ажилладаг гэр бүлийн гишүүн, хамаатан
                                    садан болон/эсвэл дотны найз бий юу?
                                </b>{" "}
                                (Гэр бүлийн гишүүний тодорхойлолт: эхнэр, нөхөр, хамтран
                                амьдрагч хүүхдүүд, эцэг эх, ах эгч нар, хадам ээж, хадам аав,
                                хадам ах, эгч, нагац, авга ба/эсвэл зээ дүү.
                                <br />
                                <b>Найзын тодорхойлолт:</b> ажилтны хамт олонд танил тал, найз
                                нөхөд, ажилтны гэр бүлийн найз, ажил хэргийн болон мэргэжлийн
                                нийтлэг ашиг сонирхол бүхий хамтран зүтгэгч ба/эсвэл "Гэр бүлийн
                                гишүүн" гэсэн тодорхойлолтод ороогүй ураг төрөл.) Хэрэв Тийм гэж
                                зурсан бол нэрийг нь бичнэ үү.
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <input
                                type="text"
                                name="friend_in_job_text"
                                value={formData.friend_in_job_text}
                                onChange={handleChange}
                                maxLength={30}
                                autoComplete="off"
                            />
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonQuestionLabelClass}>
                            <label className="capitalize" htmlFor="friend_in_job2">
                                4. Өөр газарт томилолтоор ажиллахад бэлэн эсэх ?
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <select
                                id="friend_in_job2"
                                name="friend_in_job2"
                                title="friend_in_job2"
                                value={formData.friend_in_job2}
                                onChange={handleChange}
                            >
                                <option value="Yes">Тийм</option>
                                <option value="No">Үгүй</option>
                            </select>
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonQuestionLabelClass}>
                            <label className="capitalize" htmlFor="biznes_travel">
                                5.Богино хугацаанд болон хэд хэдэн бизнес аяллаар явахад бэлэн
                                эсэх
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <select
                                id="biznes_travel"
                                name="biznes_travel"
                                title="biznes_travel"
                                value={formData.biznes_travel}
                                onChange={handleChange}
                            >
                                <option value="Yes">Тийм</option>
                                <option value="No">Үгүй</option>
                            </select>
                        </div>
                    </dd>
                    <dd>
                        <div className={styles.gnewtonQuestionLabelClass}>
                            <label className="capitalize" htmlFor="reasonSelect">
                                6. Ажлын тусгай нөхцөл төлөвлөх шаардлагатай эсэх (Жишээ нь:
                                Чөлөөний өдрөө нэмэгдүүлэх, богиносгосон цагаар ажиллах, хагас
                                цагаар ажиллах гэх мэт)
                            </label>
                        </div>
                        <div className={styles.gnewtonFieldInputClass}>
                            <select
                                id="reasonSelect"
                                name="reasonSelect"
                                title="reasonSelect"
                                onChange={handleSelectedReasonChange}
                            >
                                <option value="">-</option>
                                <option value="Yes">Тийм</option>
                                <option value="No">Үгүй</option>
                            </select>
                            {selectedReason === "Yes" && (
                                <textarea
                                    name="reason"
                                    rows={4}
                                    autoComplete="off"
                                    className="mt-2"
                                    value={formData.reason}
                                    onChange={handleChange}
                                />
                            )}
                        </div>
                    </dd>
                </dl>
            </form>
            <br />
            <div className="grid">
                <button
                    className={`rounded-sm h-10 leading-10 cursor-pointer w-28 text-white ${isNextDisabled ? "bg-[#ccd3d8]" : "bg-[#3498db]"
                        }`}
                    onClick={submitForm}
                >
                    Хадгалах
                </button>
                <Link
                    href={"/"}
                    className="text-[#666] pt-3 text-sm hover:text-[#4e4d4d]"
                >
                    Буцах
                </Link>
            </div>
        </div>
    );
};

export default Application;
