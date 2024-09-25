import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';

interface Step1Props {
    formData: {
        name: string;
        date: string
    };
    job: string | string[] | null;
    setFormData: (formData: { name: string; date: string }) => void;
    nextStep: () => void;
}

const Agreement: FC<Step1Props> = ({ formData, setFormData, nextStep, job }) => {
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const isNextDisabled = !formData.name || !formData.date
    return (
        <div>
            <div className='questions text-sm'>
                <b>{job ? job : ""}</b>
                <br />
                <br />
                <div>*Бид ажилд орох өргөдөл гаргаж, шаардлага хангасан ажил горилогчдыг үндэс, угсаа, хэл, арьсны өнгө, нас, хүйс, нийгмийн гарал байдал, хөрөнгө чинээ, эрхэлсэн ажил, албан тушаал, шашин шүтлэг, үзэл бодол, хөгжлийн бэрхшээлтэй байдал зэргээр ялгаварлан гадуурхахгүйгээр ажилд орох боломжийг тэнцүү олгодог.</div>
                <br />
                <div>"БИД АЖИЛТНУУДДАА ӨРСӨЛДӨХҮЙЦ ЦАЛИН, УРАМШУУЛАЛ БОЛОН АЖИЛЛАХ ТААТАЙ ОРЧИН НӨХЦӨЛИЙГ САНАЛ БОЛГОДОГ НЬ ЧАДВАРЛАГ ХҮНИЙ НӨӨЦИЙГ ТАТАН, ТОГТВОР СУУРЬШИЛТАЙ АЖИЛЛУУЛАХ ҮНДЭС БОЛДОГ"</div>
                <br />
            </div>
            <hr />
            <div className='flex items-center pb-5 text-sm'>
                <div className='w-20 '>Таны нэр:</div>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ "width": "300px" }}
                />
            </div>

            <div className='flex items-center pb-5 text-sm'>
                <div className='w-20'>Огноо:</div>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    style={{ "width": "300px" }}
                />
            </div>
            {/* <div className='questions text-sm'>
                <div className='questionWrapper leading-6 text-sm flex'>
                    <div className='question flex-1'>
                        Та 18-аас дээш настай юу?
                    </div>
                    <div className='questionYes w-[55px]'>
                        <div className={`gnewtonYes cursor-pointer border border-[#e67263] rounded-sm w-12 text-center bg-[#fbf5ec] ${answer != null ? 'isValid' : ''} ${answer === 'yes' ? 'isSelected' : ''}`} onClick={() => chooseAnswer('yes')}>Тийм</div>
                    </div>
                    <div className='questionNo'>
                        <div className={`gnewtonNo cursor-pointer border border-[#e67263] rounded-sm w-12 text-center bg-[#fbf5ec] ${answer != null ? 'isValid' : ''} ${answer === 'no' ? 'isSelected' : ''}`} onClick={() => chooseAnswer('no')}>Үгүй</div>
                    </div>
                </div>
            </div> */}
            <br />
            <div className="">
                <div className="mb-4">
                    <button
                        className={`rounded-sm h-10 leading-10 cursor-pointer w-32 text-white ${isNextDisabled ? "bg-[#ccd3d8]" : "bg-[#3498db]"}`}
                        onClick={nextStep}
                        disabled={isNextDisabled}
                    >
                        Үргэлжлүүлэх
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        className='text-[#666] text-sm hover:text-[#4e4d4d]'
                        onClick={() => router.back()}
                    >
                        Буцах
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Agreement;
